import express from "express";
import { EditUser, GetUser } from "../controllers/user.js";
const router = express.Router();
router.get("/find/:id", GetUser);
router.put("/:id",EditUser);
export default router;
