import express from "express";
import Journal from "../models/Journal.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new journal entry
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newJournal = new Journal({
      userId: req.user,
      title,
      content,
    });
    await newJournal.save();
    res.json(newJournal);
  } catch (err) {
    console.error("❌ Error saving journal:", err);
    res.status(500).json({ error: "Failed to save journal entry" });
  }
});

// Get all journal entries for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.user}).sort({ date: -1 });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch journals" });
  }
});

// Delete journal entry
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Journal.findOneAndDelete({ _id: req.params.id, userId: req.user});
    res.json({ message: "Journal deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete journal" });
  }
});

export default router;