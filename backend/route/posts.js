import express from "express";
import { CreatePost, GetAllPosts, GetUserPost } from "../controllers/post.js";
const router = express.Router();
router.get("/find/:id", GetAllPosts);

router.get("/:userId", GetUserPost);

router.post("/:id", CreatePost);

export default router;
