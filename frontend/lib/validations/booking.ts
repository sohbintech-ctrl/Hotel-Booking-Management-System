import {z} from "zod";

{/*BookingUpSchema*/}
export const bookingUpSchema=z.object({
  checkIn: z
  .string()
  .min(1, "Check-in date is required"),

  checkOut: z
  .string()
  .min(1, "Check-out date is required"),

   guests: z
   .string()
   .min(1, "Number of guests is required"),
   
    fullName: z
    .string()
    .min(2, "Name must be at least 2 characters"),

    phoneNumber: z
    .string()
    .min(10, "Invalid phone number"),

    email: z
    .email("Invalid email"),
    
    branches: z
    .string()
    .min(1, "Please select a branch"),

    rooms: z
    .string()
    .min(1, "Please select a room type"),

    specialRequests: z
    .string()
    .optional(),
  })
  .refine((data)=>new Date(data.checkOut)>new Date(data.checkIn),{
   message:"Check-out date must be after check-in date",
   path:["checkOut"],
  })

export type BookingData=z.infer<typeof bookingUpSchema>;