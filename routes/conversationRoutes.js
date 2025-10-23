import express from "express";
import Conversation from "../models/conversationModel.js";
import authMiddleware from "../middleware/authMiddleware.js"; // adapt path if different

const router = express.Router();

// Save conversation (authenticated)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { messages = [], riskFlag = false, resourcesProvided = [] } = req.body;
    const conv = new Conversation({
      userId: req.user.id,
      messages,
      riskFlag,
      resourcesProvided
    });
    await conv.save();
    res.json(conv);
  } catch (err) {
    console.error("Error saving conversation:", err);
    res.status(500).json({ error: "Failed to save conversation" });
  }
});

// Get user's conversations
router.get("/", authMiddleware, async (req, res) => {
  try {
    const convs = await Conversation.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(convs);
  } catch (err) {
    console.error("Error fetching conversations:", err);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

export default router;