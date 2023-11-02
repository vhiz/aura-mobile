import { Schema, model } from "mongoose";

const postsSchema = new Schema(
  {
    userId: {
      type: String,
    },
    desc: {
      type: String,
      max: 600,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Posts = model("Posts", postsSchema);
export default Posts;
