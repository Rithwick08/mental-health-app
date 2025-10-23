import express from "express";
import Mood from "../models/Mood.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Add mood
router.post("/", auth, async (req, res) => {
  try {
    const newMood = new Mood({ userId: req.user, mood: req.body.mood });
    await newMood.save();
    res.json(newMood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get moods for user
router.get("/", auth, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;