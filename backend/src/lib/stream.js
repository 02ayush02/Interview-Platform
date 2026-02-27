import { StreamChat } from "stream-chat"
import { ENV } from "./env.js"
import { StreamClient } from "@stream-io/node-sdk"

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if (!apiKey || !apiSecret) {
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing")
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret); // this will be used for chat features
export const streamClient = new StreamClient(apiKey, apiSecret); // this will be used for video calls

export const upsertStreamUser = async(userData) => {
    try {
        await chatClient.upsertUser(userData);
        console.log("Stream user upserted successfully:", userData);
    } catch (err) {
        console.error("Error upserting Stream user:", err);
    }
}

export const deleteStreamUser = async(userData) => {
    try {
        await chatClient.deleteUser(userId);
        console.log("Stream user deleted successfully:", userId);
    } catch (err) {
        console.error("Error deleting the Stream user:", err);
    }
}

