import {z} from "zod";

{/*SignUpSchema*/}

export const signUpSchema=z.object({
   name:z
   .string()
   .min(2,"Name must be at least 2 characters"),

   email:z
   .email("Invalid email"),

   number: z
   .string()
   .min(10,"Invalid phone number")
    .regex(/^9\d{9}$/, "Invalid phone number"),

   password:z
   .string()
   .min(6,"Passwords must at least 6 characters")
   .regex(/[A-Z]/, "Must contain an uppercase letter"),

   confirmPassword:z
   .string(),
})
   .refine((data)=>data.password===data.confirmPassword,{
      message:"Password dont match",
      path:["confirmPassword"]
   })

export type SignUpData=z.infer<typeof signUpSchema>
export type SignUpPayload = Omit<SignUpData, "confirmPassword">
{/*loginUpSchema*/}

export const LoginUpSchema=z.object({
   email:z.email("Invalid Email"),

   password:z
   .string()
   .min(6,"Passwords must at least 6 characters")
   .regex(/[A-Z]/, "Must contain an uppercase letter"),
})

export type LoginData=z.infer<typeof LoginUpSchema>