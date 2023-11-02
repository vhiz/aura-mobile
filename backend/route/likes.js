import express from "express";
const router = express.Router();

import { Like } from "../controllers/like.js";

router.put("/:postId/like", Like);

export default router;
