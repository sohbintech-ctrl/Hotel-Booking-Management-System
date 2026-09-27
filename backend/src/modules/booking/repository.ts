import { Booking } from "./schema.js";

export const createBooking = async (data: {
  userId: string;
  roomId: string;
  fullName: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
}) => {
  return await Booking.create(data);
};
