import mongoose from 'mongoose';
import { ENV } from './env.js'

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(ENV.DB_URL)
        console.log("MongoDB Connected:", connect.connection.host);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // 0 means success, 1 means failure
    }
}