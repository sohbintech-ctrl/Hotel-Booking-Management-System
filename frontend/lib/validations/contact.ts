import {z} from "zod";

export const ContactUpSchema=z.object({
  fullName:z
  .string()
  .min(2,"Name must at least 2 characters"),
  
  email:z
  .email("Invalid Email"),

  subject:z
  .string()
  .min(4,"Subject Must be at least 4 characters"),

  message:z
  .string()
  .min(20,"Message must be longer"),
})

export type ContactData=z.infer<typeof ContactUpSchema>;