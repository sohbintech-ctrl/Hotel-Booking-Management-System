import type {Request, Response } from "express";
import { createBookingService } from "./service.js";

export const createBookingController = async (
  req: Request,
  res: Response
) => {
  try {
    const { roomId, fullName, phone, checkIn, checkOut } = req.body;

    const userId = req.user?.userId;

   if (!userId) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
     });
   }

    const booking = await createBookingService({
      userId,
      roomId,
      fullName,
      phone,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
    });

    return res.status(201).json({ 
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create booking",
    });
  }
};