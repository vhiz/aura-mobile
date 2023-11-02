import express from "express";
import { AddMessage, GetMessage, Read } from "../controllers/message.js";
const router = express.Router();

router.post("/:id", AddMessage);
router.put("/:id", Read);

router.get("/:conversationId", GetMessage);
export default router;
