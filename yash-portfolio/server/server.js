/* ==========================================
   IMPORT PACKAGES
========================================== */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");


/* ==========================================
   CONFIGURATION
========================================== */

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

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

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: `
You are Yash Garg's AI Portfolio Assistant.

Only answer questions related to Yash Garg.

Information about Yash:

- Computer Science Sophomore at MNNIT Allahabad
- Competitive Programmer
- Full Stack Developer
- AI/ML Enthusiast

Skills:
- C++
- C
- HTML
- CSS
- JavaScript
- Git
- GitHub

Projects:
- Gojo Hollow Purple
- Personal Portfolio

If someone asks unrelated questions, politely say that you only answer questions related to Yash's portfolio.

User Question:
${message}
`

        });

        res.json({

            reply: response.text

        });

    }

    catch (error) {

        console.error("Gemini Error:", error);

        res.status(500).json({

            reply: "Something went wrong while communicating with Gemini."

        });

    }

});


/* ==========================================
   START SERVER
========================================== */

app.listen(PORT, () => {

    console.log(`🚀 Server is running on http://localhost:${PORT}`);

});