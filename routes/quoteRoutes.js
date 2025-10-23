import express from "express";
const router = express.Router();

// Example static list — you can later connect this to an API or database
const quotes = [
  "Your mental health is a priority. Take care of yourself first.",
  "Healing takes time, and asking for help is a courageous step.",
  "Every day may not be good, but there is something good in every day.",
  "Your feelings are valid. Allow yourself to feel and to heal.",
  "Self-care is how you take your power back.",
  "You are enough, just as you are.",
  "Small progress is still progress. Keep going."
];

// Route to get a random quote
router.get("/", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[randomIndex] });
});

export default router;