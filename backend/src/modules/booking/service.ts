import { createBooking } from "./repository.js";

export const createBookingService = async (data: {
  userId: string;
  roomId: string;
  fullName: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
}) => {
  const booking = await createBooking(data);

  return booking;
};