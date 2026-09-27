import type { Request, Response } from "express";
import { createRoomService, deleteRoomService, getRoomByIdService, getRoomsService, updateRoomService } from "./service.ts";

//create Room Controller
export const createRoomController = async (
  req: Request,
  res: Response
) => {
  try {
    const room = await createRoomService(req.body);

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create room",
    });
  }
};

//getRoomController

export const getRoomsController = async (
  req: Request,
  res: Response
) => {
  try {
    const rooms = await getRoomsService();

  return res.status(200).json({
  data: rooms,
});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
    });
  }
};

//deleteRoomController
export const deleteRoomController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

     if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid room id",
      });
    }

    await deleteRoomService(id);

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete room",
    });
  }
};

//updateRoomController
export const updateRoomController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid room id",
      });
    }

    const updatedRoom = await updateRoomService(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: updatedRoom,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update room",
    });
  }
};

//getRoomById details controller
export const getRoomByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid room id",
      });
    }

    const room = await getRoomByIdService(id);

    return res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch room",
    });
  }
};