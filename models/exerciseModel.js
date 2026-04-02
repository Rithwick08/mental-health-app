import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["relaxation", "mindfulness", "focus"],
    required: true,
  },
  steps: [{ type: String }],
  duration: { type: Number, default: 5 }, // in minutes
  benefits: [{ type: String }],
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;