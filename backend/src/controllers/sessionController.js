import Session from "../models/Session.js";
import { chatClient, streamClient } from "../lib/stream.js";

import mongoose from "mongoose";

export async function createSession(req, res) {
    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    try {
        const { problem, difficulty } = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        // Validation
        if (!problem || !difficulty) {
            await mongoSession.abortTransaction();
            mongoSession.endSession();
            return res.status(400).json({
                message: "Problem and difficulty are required"
            });
        }

        const allowedDifficulties = ["easy", "medium", "hard"];
        if (!allowedDifficulties.includes(difficulty.toLowerCase())) {
            await mongoSession.abortTransaction();
            mongoSession.endSession();
            return res.status(400).json({
                message: "Invalid difficulty level"
            });
        }

        // Generate unique call ID
        const callId = `session_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 9)}`;

        // Create DB session (inside transaction)
        const session = await Session.create(
            [{
                problem,
                difficulty,
                user: userId,
                clerkId,
                callId,
            }],
            { session: mongoSession }
        );

        const createdSession = session[0];

        // Create Stream video call
        const call = streamClient.video.call("default", callId);

        await call.getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: {
                    problem,
                    difficulty,
                    sessionId: createdSession._id.toString(),
                },
            },
        });

        //  Create Stream chat channel
        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId],
        });

        await channel.create();

        // Commit transaction (ONLY if everything succeeded)
        await mongoSession.commitTransaction();
        mongoSession.endSession();

        res.status(201).json({
            message: "Session created successfully",
            session: createdSession,
        });

    } catch (err) {
        // Rollback if anything fails
        await mongoSession.abortTransaction();
        mongoSession.endSession();

        console.error("Error in createSession:", err);
        res.status(500).json({
            message: "Failed to create session. Rolled back changes.",
        });
    }
}

export async function getActiveSessions(req, res) {
    try {
        // populate is feature of mongoose -> what we want is the name of the host and profileImage
        // populate the host so we can get all the fields
        const sessions = await Session.find({status: "active"}
            .populate("host", "name profileImage email clerkId"))
            .sort({createdAt: -1})
            .limit(20);

        res.status(200).json({sessions})
    } catch (err) {
        console.log("Error in getActiceSessions controller:", err.message)
        res.error(500).json({message: "Internal Server Error"})
    }
}

export async function getMyRecentSessions(req, res) {
    try {
        const userId = req.user._id;
        
        // get sessions where user is either host or participant
        const sessions = await Session.find({
            status: "completed", 
            $or: [{host: userId}, {participant: userId}]
        })
        .sort({createdAt: -1})
        .limit(20)

        res.status(200).json({sessions})

    } catch (err) {
        console.log("Error in getMyRecentSessions controller", err.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getSessionById(req, res) {
    try {
        const {id} = req.params;

        const session = await Session.findById(id)
            .populate("host","name email profileImage clerkId")
            .populate("participant", "name email profileImage clerkId")

        if (!session) return res.status(400).json({message: "Session not found"})

        res.status(200).json({session})
    } catch (err) {
        console.error("Error in getSessionById controllers", err.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function joinSession(req, res) {
    try {
        const { id } = req.params;

        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        const session = await Session.findById(id);

        if (!session) return res.status(400).json({message: "Session not found"});

        if (session.status !== active) {
            return res.status(400).json({message: "Cannot join a completed session"});
        }

        if (session.host.toString() === userId.toString()) {
            return res.status(400).json({message: "Host cannot join their own session as participant"});
        }

        // check if the session is already fulled means already has 2 participants
        if (session.participant) return res.status(409).json({message: "Session is full"})

        session.participant = userId;
        await session.save();

        const channel = chatClient.channel("messaging", session.callId)
        await channel.addMembers([clerkId]);

        res.status(200).json({session})
    } catch (err) {
        console.log("Error in joinSession controller:", err.message)
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function endSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const session = await Session.findById(id);

        if (!session) return res.status(404).json({message: "Session not found"});

        // check if user is the host
        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({message: "Only the host can end the session"})
        }

        // check if the session is already completed
        if (session.status === "completed") {
            return res.status(400).json({message: "Session is already completed"})
        }


        // delete stream video call
        const call = streamClient.video.call("default", session.callId) // first grab the call
        await call.delete({hard: true})

        // delete stream chat channel
        const channel = chatClient.channel("message", session.callId);
        await channel.delete();

        session.status = "completed";
        await session.save();

        res.status(200).json({message: "Session ended successfully"});
    } catch (err) {
        console.log("Error in endSession controller", err.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}