import mongoose from "mongoose";
import dotenv from "dotenv";
import Exercise from "./models/exerciseModel.js";

dotenv.config();

const exercises = [
  {
    title: "Deep Breathing",
    description: "Sit comfortably, close your eyes, and inhale deeply through your nose for 4 seconds. Hold for 4 seconds, then exhale for 4 seconds.",
    category: "relaxation",
  },
  {
    title: "Body Scan",
    description: "Lie down and slowly focus on relaxing each part of your body, starting from your toes up to your head.",
    category: "relaxation",
  },
  {
    title: "Mindful Observation",
    description: "Pick an object and observe it carefully for one minute. Notice its shape, color, and texture without judgment.",
    category: "mindfulness",
  },
  {
    title: "5-4-3-2-1 Grounding",
    description: "Acknowledge 5 things you see, 4 things you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
    category: "mindfulness",
  },
  {
    title: "Focus Breathing",
    description: "Inhale deeply and focus on a single point in front of you. Each time your mind wanders, gently bring your attention back to your breath.",
    category: "focus",
  },
  {
    title: "Pomodoro Reset",
    description: "Work with focus for 25 minutes, then take a 5-minute mindfulness break before resuming.",
    category: "focus",
  },
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Exercise.deleteMany({});
    await Exercise.insertMany(exercises);
    console.log("✅ Exercises seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedData();