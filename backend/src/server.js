import express from 'express';
import { ENV } from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import {serve} from "inngest-express"

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
// credentials: true allows cookies to be sent in cross-origin requests. 
// This is necessary for authentication to work properly when the client 
// and server are on different domains (or ports in development).

// credentials: true is used to allow cookies to be sent in cross-origin requests. 
// This is necessary for authentication to work properly when the client and server are 
// on different domains (or ports in development).

// cross-origin resource sharing (CORS) is a security feature implemented by browsers 
// to restrict web applications from making requests to a different domain than the 
// one that served the web page. but here it is set to true to allow cross-origin requests from the client URL specified in the environment variables.
// to allow the frontend to make requests to the backend without being blocked by CORS policy, we need to enable CORS on the backend and specify the allowed origin (the client URL).
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));


app.use("/api/inngest", serve({client: inngest, functions}));



// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
}



const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log("Success Server is running on:", ENV.PORT)
        });
    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
}

startServer();