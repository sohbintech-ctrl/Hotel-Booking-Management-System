import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
  getMeController,
  deleteUserController,
  updateUserController,
} from "./controller.js";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const router = Router();

router.post("/", createUserController);
router.get("/", getAllUsersController);
router.get("/me",authMiddleware, getMeController);
router.patch("/me", authMiddleware, updateUserController);
router.delete("/:id",authMiddleware, deleteUserController);

export default router; 