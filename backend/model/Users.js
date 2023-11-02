import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
    coverPic: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      max: 60,
    },
    website: {
      type: String,
    },
    phoneno: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    expoPushToken: { type: String },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
