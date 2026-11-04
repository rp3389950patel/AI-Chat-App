
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import mongoose from "mongoose";
import ChatRoutes from "./routes/chat.js"
import AuthRoutes from "./routes/auth.js";

const app = express();


app.use(express.json());
app.use(cors());

app.use("/api", ChatRoutes);
app.use("/api/auth", AuthRoutes);
app.get("/api/auth/test", (req, res) => {
    res.json({ message: "Auth route is working!" });
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:8080`);
    connectDB();
});

const connectDB = async () => {
    console.log(
        "MongoDB URI available:",
        Boolean(process.env.MONGODB_URI)
    );
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with DataBase!")
    } catch (err) {
        console.log("Failed to connect with DB", err)
    }
}
// app.post("/test", async (req, res) => {

//     const options = {
//         method: "POST",

//         headers: {
//             "Content-Type": "application/json",
//             "x-goog-api-key": process.env.GEMINI_API_KEY
//         },

//         body: JSON.stringify({
//             model: "gemini-3.6-flash",
//             messages: [{
//                 role: "user",
//                 content: message
//             }]
//         })
//     };

//     try {

//         const response = await fetch(
//             "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
//             options
//         );

//         const data = await response.json();

//         console.log(data);

//         if (!response.ok) {
//             return res.status(response.status).json(data);
//         }

//         res.send(data.candidates?.[0]?.content?.parts?.[0]?.text || "No response");

//     } catch (err) {

//         console.log(err);
//         res.status(500).send("Something went wrong");

//     }

// });













