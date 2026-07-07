/* ==========================================
   IMPORT PACKAGES
========================================== */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");
const buildPrompt = require("./prompt");


/* ==========================================
   CONFIGURATION
========================================== */

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


/* ==========================================
   MIDDLEWARE
========================================== */

app.use(cors());

app.use(express.json());


/* ==========================================
   ROUTES
========================================== */

app.get("/", (req, res) => {

    res.send("🚀 Backend is running successfully!");

});


/* ==========================================
   GEMINI CHAT ROUTE
========================================== */

app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {

            return res.status(400).json({
                reply: "Message is required."
            });

        }

        const prompt = buildPrompt(message);

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt,

            config: {

                temperature: 0.2,

                topP: 0.8,

                maxOutputTokens: 350

            }

        });

        res.json({

            reply: response.text

        });

    }

    catch (error) {

        console.error("Gemini Error:");

        console.error(error);

        res.status(500).json({

            reply: "Sorry, something went wrong while generating the response."

        });

    }

});


/* ==========================================
   START SERVER
========================================== */

app.listen(PORT, () => {

    console.log(`🚀 Server is running on http://localhost:${PORT}`);

});