import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch"; // or your OpenAI client if you prefer
import Conversation from "../models/conversationModel.js";
import authMiddleware from "../middleware/authMiddleware.js"; // use your auth middleware to identify user (optional but recommended)

dotenv.config();
const router = express.Router();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_BASE_URL = "https://api.groq.com/openai/v1"; // or your OpenAI setup

// Conservative keyword-based risk detection
function detectRisk(text) {
  if (!text) return false;
  const t = text.toLowerCase();
  // Very conservative set of phrases that indicate immediate self-harm ideation
  const patterns = [
    "kill myself",
    "i want to die",
    "i'm going to kill myself",
    "i want to end my life",
    "suicid", // covers suicide, suicidal
    "hurt myself",
    "i can't go on",
    "i don't want to live",
    "end my life",
  ];
  return patterns.some((p) => t.includes(p));
}

// Example resources list - you should customize by country/region
function getCrisisResources() {
  // Minimal generic list; replace and expand as needed
  return [
    {
      title: "Local Emergency Services",
      description: "If you're in immediate danger, call your local emergency number (e.g., 911).",
      phone: "100",
      url: null,
    },
    {
      title: "International Suicide Hotlines Directory",
      description: "Find local crisis lines by country.",
      url: "https://www.opencounseling.com/suicide-hotlines",
    },
    {
      title: "If you're in the India — call or text 100",
      phone: "100",
      url: "https://988lifeline.org/",
    },
    {
      title: "If you're elsewhere, contact your local suicide prevention helpline or nearest emergency number.",
      url: "https://www.opencounseling.com/suicide-hotlines",
    },
  ];
}

// Route accepts { conversation: [{sender, text}], tone }
// Optional: add authMiddleware here to save under user account; if not using auth, omit it
router.post("/", async (req, res) => {
  const { conversation = [], tone = "friendly and general", userId } = req.body;

  try {
    // Combine last user message(s) to check risk
    const lastUserMessage = [...conversation].reverse().find(m => m.sender === "user");
    const lastText = lastUserMessage ? lastUserMessage.text : "";

    const riskDetected = detectRisk(lastText);

    if (riskDetected) {
      const resources = getCrisisResources();

      // Immediate supportive reply (short, not clinical)
      const reply = "I'm really sorry you're feeling this way. You deserve support right now. If you are in immediate danger, please call your local emergency number right now (e.g., 911). " +
        "If you can, please consider contacting a crisis line — here are some resources I can recommend. Would you like me to call out local numbers or connect you to them?";

      // Save conversation with riskFlag true
      try {
        // if you have JWT-based auth, prefer storing with user id from token; otherwise pass userId in body
        const conv = new Conversation({
          userId: req.user?.id || userId || null,
          messages: conversation,
          riskFlag: true,
          resourcesProvided: resources,
        });
        await conv.save();
      } catch (err) {
        console.error("Error saving risky conversation:", err);
      }

      return res.status(200).json({ reply, risk: true, resources });
    }

    // If not risky — forward to your AI provider (Groq/OpenAI)
    const messages = [
      {
        role: "system",
        content: `You are MentiHaven AI, a ${tone} mental wellness companion. Respond kindly, concisely, and avoid giving medical advice.`,
      },
      ...conversation.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    // Example using Groq-compatible endpoint (adjust model)
    const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.8,
        max_tokens: 250,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Groq API error:", data);
      return res.status(500).json({ reply: "AI service error. Please try again later." });
    }

    const aiReply = data?.choices?.[0]?.message?.content || "I'm here to listen.";
    // Save conversation (riskFlag false)
    try {
      const conv = new Conversation({
        userId: req.user?.id || userId || null,
        messages: [...conversation, { sender: "ai", text: aiReply }],
        riskFlag: false,
        resourcesProvided: [],
      });
      await conv.save();
    } catch (err) {
      console.error("Error saving conversation:", err);
    }

    return res.json({ reply: aiReply, risk: false });
  } catch (error) {
    console.error("AI Companion Error:", error);
    return res.status(500).json({ reply: "Error generating AI response." });
  }
});

export default router;