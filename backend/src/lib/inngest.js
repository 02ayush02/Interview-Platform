import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/Users.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";
import { deleteModel } from "mongoose";

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
    
        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            image: newUser.profileImage,

        })
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

        await deleteStreamUser(id.toString());
    }

)

export const functions = [syncUser, deleteUserFromDB]