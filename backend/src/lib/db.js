import mongoose from 'mongoose';
import { ENV } from './env.js'

export const connectDB = async () => {
    try {
        if (!ENV.DB_URL) {
            throw new Error("DB_URL is not defined in the environment variables");
        }

        const connect = await mongoose.connect(ENV.DB_URL)
        console.log("MongoDB Connected:", connect.connection.host);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // 0 means success, 1 means failure
    }
}