import express from "express";
import mongoose from "mongoose";
const app = express();
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";

import authRoute from "./route/auth.js";
import postRoute from "./route/posts.js";
import usersRoute from "./route/users.js";
import commentsRoute from "./route/comment.js";
import likesRoute from "./route/likes.js";
import conversationRoute from "./route/conversations.js";
import messagesRoute from "./route/messages.js";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "*");
  next();
});
app.use(helmet());
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGOURI);

const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", usersRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/likes", likesRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messagesRoute);

const Port = process.env.PORT || 3001;
app.listen(Port, () => {
  console.log(`connected at Port ${Port}`);
});
