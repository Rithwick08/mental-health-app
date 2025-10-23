import express from "express";
import Exercise from "../models/exerciseModel.js";

const router = express.Router();

// ✅ Fetch all exercises (optionally filtered by category)
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) query.category = category.toLowerCase();

    const exercises = await Exercise.find(query);
    res.json(exercises);
  } catch (err) {
    console.error("Error fetching exercises:", err);
    res.status(500).json({ error: "Server error while fetching exercises" });
  }
});

export default router;