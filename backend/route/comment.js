import express from "express";
import { CreateComment, GetAllComments } from "../controllers/comment.js";
const router = express.Router();
router.get("/", GetAllComments);

router.post("/:id", CreateComment);
export default router;
