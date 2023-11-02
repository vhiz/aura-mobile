import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    members: Array,
  },
  { timestamps: true }
);

export default model("Conversation", conversationSchema);
