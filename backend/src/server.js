// const express = require("express") -> Common way how express is started
                                        // but now a modern syntax is there
import express from "express"
import { ENV } from "./lib/env.js"

const app = express()

const PORT = ENV.PORT;
const DB_URL = ENV.DB_URL;

app.get("/", (req, res) => {
    res.status(200).json({message: "Success from API"})
})


app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})