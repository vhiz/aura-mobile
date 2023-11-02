import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: { type: String, required: true },
    sender: { type: String },
    text: { type: String, required: true },
    senderRead: { type: Boolean, default: true },
    reciverRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("Message", messageSchema);
