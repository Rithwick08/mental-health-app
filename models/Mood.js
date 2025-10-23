import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: String, required: true }, // e.g. happy, sad, stressed
  date: { type: Date, default: Date.now }
});

const Mood = mongoose.model("Mood", moodSchema);
export default Mood;