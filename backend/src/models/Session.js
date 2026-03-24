import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    problem: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ["easy", "medium", "hard"],
        lowercase: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Matches the model name in Users.js
        required: true
    },
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    callId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active"
    }
}, { timestamps: true });

// Indexing for faster queries on active sessions
sessionSchema.index({ status: 1, createdAt: -1 });

const Session = mongoose.model("Session", sessionSchema);

export default Session;