import { Router } from "express";
import { createBookingController } from "./controller.js";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const router = Router();

router.post("/",authMiddleware, createBookingController);

export default router;