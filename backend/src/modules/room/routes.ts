import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import { adminMiddleware } from "../middleware/adminMiddleware.ts";
import { createRoomController, deleteRoomController, getRoomByIdController, getRoomsController, updateRoomController } from "./controller.ts";


const router = Router();

router.post("/", authMiddleware, adminMiddleware, createRoomController);
router.get("/", getRoomsController);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteRoomController
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateRoomController
);
router.get("/:id", getRoomByIdController);

export default router;