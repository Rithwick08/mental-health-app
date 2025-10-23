import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  messages: [
    {
      sender: { type: String, enum: ["user", "ai"], required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  riskFlag: { type: Boolean, default: false }, // set true if suicidal/self-harm language detected
  resourcesProvided: { type: Array, default: [] }, // array of objects { title, url, phone }
  createdAt: { type: Date, default: Date.now },
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;