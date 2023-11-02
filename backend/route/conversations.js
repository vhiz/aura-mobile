import express from "express";
import {
  GetConversation,
  GetConversations,
  NewConversation,
} from "../controllers/conversation.js";
const router = express.Router();
router.post("/:id", NewConversation);

router.get("/:id", GetConversations);

router.get("/find/:id/:secondId", GetConversation);

export default router;
