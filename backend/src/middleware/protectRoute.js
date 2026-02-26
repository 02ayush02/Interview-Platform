import { requireAuth } from '@clerk/express'
import User from "../models/Users.js"


// when you pass an array of middleware to Express, it automatically 
// flattens and executes them sequentially, one by one
export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth().userId; // userId coming from the clerk 
            if (!clerkId) return res.status(401).json({message : "Unauthorized - Invalid Token"});

            // find the user in db by clerk Id
            const user = await User.findOne({clerkId}); // this is the user we have in the database

            if (!user) return res.status(404).json({message: "User not found"});
            
            // attach user to req
            req.user = user;
            next();
        } catch (err) {
            console.error("Error in protectRoute middleware", err);
            res.status(500).json({ message: "Internal Server Error"});
        }

    } 
]
