import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";


import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/quotes", quoteRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    console.log("PORT from env:", process.env.PORT); // debug log
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
  