import express from 'express';
import { ENV } from './lib/env.js';

const app = express();

console.log(ENV.PORT)
console.log(ENV.DB_URL)

app.get("/abhi", (req, res) => {
    res.status(200).json({ message: "Hello World" });
})

app.listen(ENV.PORT, () => console.log("Success Server is running on:", ENV.PORT))