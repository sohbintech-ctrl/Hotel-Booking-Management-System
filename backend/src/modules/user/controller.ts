import type { Request, Response } from "express";
import {
  createUserService,
  getAllUsersService,
  getMeService,
  deleteUserService,
  updateUserService,
} from "./service.js";

export const createUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await createUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const getMeController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await getMeService(req.user!.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

export const updateUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const result = await updateUserService(
      userId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update profile",
    });
  }
};

export const deleteUserController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await deleteUserService(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

