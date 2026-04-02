import mongoose from "mongoose";
import dotenv from "dotenv";
import Exercise from "./models/exerciseModel.js";

dotenv.config();

const exercises = [
  // ─── RELAXATION ───────────────────────────────────────────────
  {
    title: "Box Breathing",
    description: "A powerful technique used by Navy SEALs to stay calm under pressure. Regulate your nervous system in just a few minutes.",
    category: "relaxation",
    duration: 5,
    benefits: ["Reduces stress instantly", "Lowers heart rate", "Improves focus"],
    steps: [
      "Find a comfortable seated position and close your eyes.",
      "Breathe out slowly, releasing all air from your lungs.",
      "Inhale through your nose for 4 counts — feel your lungs expand fully.",
      "Hold your breath for 4 counts — stay still and relaxed.",
      "Exhale slowly through your mouth for 4 counts — let tension flow out.",
      "Hold again for 4 counts — notice the stillness.",
      "Repeat this cycle 4–6 times at a comfortable, steady pace.",
      "Gently open your eyes and take a moment before returning to activity.",
    ],
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "Systematically tense and release muscle groups to release physical tension stored in your body from stress.",
    category: "relaxation",
    duration: 10,
    benefits: ["Releases physical tension", "Improves sleep quality", "Reduces anxiety"],
    steps: [
      "Lie down or sit in a comfortable chair. Close your eyes.",
      "Take 3 slow, deep breaths to settle into the space.",
      "Starting with your feet — curl your toes tightly for 5 seconds.",
      "Release all tension suddenly. Notice the contrast — warm, heavy, relaxed.",
      "Move to your calves — flex them tight for 5 seconds, then release.",
      "Continue up: thighs → stomach → hands (make fists) → shoulders (shrug up to ears) → face (scrunch everything).",
      "With each release, say quietly to yourself: 'I am relaxed.'",
      "End by taking 3 deep breaths and noticing how your whole body feels.",
    ],
  },
  {
    title: "4-7-8 Breathing",
    description: "Dr. Andrew Weil's calming breath technique that acts like a natural tranquilizer for the nervous system.",
    category: "relaxation",
    duration: 3,
    benefits: ["Reduces anxiety quickly", "Helps with sleep", "Calms fight-or-flight response"],
    steps: [
      "Sit upright with your back straight. Place the tip of your tongue behind your upper front teeth.",
      "Exhale completely through your mouth, making a whoosh sound.",
      "Close your mouth and inhale quietly through your nose for 4 counts.",
      "Hold your breath for a count of 7 — don't strain.",
      "Exhale completely through your mouth with a whoosh sound for 8 counts.",
      "That completes one breath. Repeat for 3 more cycles.",
      "After the 4th cycle, breathe normally and sit quietly for a moment.",
      "Practice twice daily for best results — morning and before bed.",
    ],
  },

  // ─── MINDFULNESS ──────────────────────────────────────────────
  {
    title: "5-4-3-2-1 Grounding",
    description: "An evidence-based grounding technique to instantly anchor yourself to the present moment when anxiety spikes.",
    category: "mindfulness",
    duration: 5,
    benefits: ["Stops panic attacks", "Breaks anxious thought loops", "Brings you to the present"],
    steps: [
      "Pause wherever you are. Take one slow, deep breath.",
      "Look around and name 5 things you can SEE — describe them in detail (color, shape, size).",
      "Notice 4 things you can TOUCH — reach out and feel their texture, temperature, weight.",
      "Listen carefully for 3 things you can HEAR — near or far, loud or faint.",
      "Identify 2 things you can SMELL — breathe in gently, even subtle scents count.",
      "Notice 1 thing you can TASTE — the lingering flavor in your mouth.",
      "Take another slow breath. Notice how your feet feel on the ground.",
      "Say to yourself: 'I am right here. I am safe. This moment is enough.'",
    ],
  },
  {
    title: "Mindful Observation",
    description: "Train your attention and presence by studying a single object with the curiosity of seeing it for the first time.",
    category: "mindfulness",
    duration: 5,
    benefits: ["Sharpens attention", "Reduces mind-wandering", "Cultivates beginner's mind"],
    steps: [
      "Choose any nearby object — a plant, a mug, a pen. Hold it if you can.",
      "Set a timer for 3–5 minutes. This is your only task.",
      "Begin by observing its overall shape — as if you've never seen anything like it.",
      "Slowly notice the colors — are there subtle shades you hadn't seen before?",
      "Explore its texture, weight, and temperature in your hands.",
      "Look for details: edges, patterns, imperfections, reflections of light.",
      "When your mind wanders (it will), gently return your gaze without judgment.",
      "At the end, set the object down and notice how your mind feels — quieter, clearer.",
    ],
  },
  {
    title: "Loving-Kindness Meditation",
    description: "Send goodwill and warmth to yourself and others. One of the most researched techniques for increasing positive emotions.",
    category: "mindfulness",
    duration: 10,
    benefits: ["Increases compassion", "Reduces self-criticism", "Improves relationships"],
    steps: [
      "Sit comfortably, close your eyes, and take 3 grounding breaths.",
      "Place your hand on your heart. Feel your heartbeat.",
      "Silently repeat: 'May I be happy. May I be healthy. May I be safe. May I be at peace.'",
      "Let those words land — don't rush. Feel any warmth that arises.",
      "Now bring to mind someone you love easily — picture their face, smile.",
      "Extend the same wish: 'May you be happy. May you be healthy. May you be safe. May you be at peace.'",
      "Expand to a neutral person, then someone difficult, then all beings everywhere.",
      "End by returning to yourself. Rest in whatever warmth or stillness you feel.",
    ],
  },

  // ─── FOCUS ────────────────────────────────────────────────────
  {
    title: "Single-Tasking Reset",
    description: "Reclaim your attention by fully committing to one task with intention. The antidote to scattered, multitasking energy.",
    category: "focus",
    duration: 25,
    benefits: ["Boosts deep work", "Reduces mental fatigue", "Increases output quality"],
    steps: [
      "Choose ONE task. Write it down on paper — make it concrete and specific.",
      "Clear your environment: close unnecessary tabs, silence notifications, put your phone face-down.",
      "Set a timer for 25 minutes (Pomodoro method). This block belongs entirely to this task.",
      "Before starting, take 3 slow breaths and say: 'For the next 25 minutes, this is all that matters.'",
      "Begin working. When distractions arise — write them on a 'later list' and return immediately.",
      "When the timer ends, stop. Stand up, stretch, walk for 5 minutes.",
      "Review: what did you accomplish? What helped? What pulled you away?",
      "Take a 5-minute break, then decide — same task again, or something new?",
    ],
  },
  {
    title: "Focus Breathing Anchor",
    description: "Use your breath as an anchor to train sustained attention — the foundation of all deep concentration.",
    category: "focus",
    duration: 5,
    benefits: ["Trains sustained attention", "Reduces mental clutter", "Improves working memory"],
    steps: [
      "Sit upright in your chair. Both feet flat on the floor. Hands resting on your lap.",
      "Close your eyes or soften your gaze to a point on the floor.",
      "Begin breathing naturally — don't force or control it.",
      "Choose one sensation to anchor your attention: the air entering your nostrils, the rise of your chest, or the fall of your belly.",
      "Stay with that sensation. Count each exhale: 1, 2, 3… up to 10, then restart.",
      "Each time your mind wanders — and it will — simply notice, and return to 1.",
      "Don't judge yourself for wandering. Each return IS the exercise.",
      "After 5 minutes, open your eyes slowly. You've just trained your focus muscle.",
    ],
  },
  {
    title: "Mindful Walking Break",
    description: "Transform a regular walk into a moving meditation that clears mental fog and refreshes your focus.",
    category: "focus",
    duration: 10,
    benefits: ["Clears mental fatigue", "Boosts creativity", "Improves mood and energy"],
    steps: [
      "Step away from your screen. Go outside or find a quiet space to walk.",
      "Begin walking at a slower-than-usual pace.",
      "Feel each footstep: heel touching ground, weight shifting, toes lifting.",
      "Match your breath to your steps — inhale for 4 steps, exhale for 4 steps.",
      "Look around with curious eyes — notice colors, shadows, small details you usually overlook.",
      "If a thought about work or worry appears, acknowledge it and gently return to your feet.",
      "For the last 2 minutes, walk even more slowly and take full, deep breaths.",
      "Before returning to your desk, stand still for 30 seconds. Set an intention for your next work session.",
    ],
  },
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Exercise.deleteMany({});
    await Exercise.insertMany(exercises);
    console.log(`✅ ${exercises.length} exercises seeded successfully!`);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedData();