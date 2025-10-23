import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["relaxation", "mindfulness", "focus"],
    required: true,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;