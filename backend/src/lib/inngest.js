import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/Users.js";

export const inngest = new Inngest({ id: "interview-platform" })


// taking the user from the clerk and save it to the mongodb
const syncUser = inngest.createFunction(
    { id: "sync-user"},
    { event: "clerk/user.created"},
    async ({event}) => {
        await connectDB()

        // destructuring the data from the clerk
        const {id, email_addresses, first_name, last_name, image_url } = event.data;

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url
        }

        await User.create(newUser); // this is going to create a user in the db
    
        // todo: do something else
    }

)

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db"},
    { event: "clerk/user.deleted"},
    async ({event}) => {
        await connectDB()

        // destructuring the data from the clerk
        const {id, email_addresses, first_name, last_name, image_url } = event.data;

        await User.deleteOne({ clerkId: id });

        // todo: do something else
    }

)

export const functions = [syncUser, deleteUserFromDB]