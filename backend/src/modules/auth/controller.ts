import type { Request, Response } from "express";
import { loginService, registerService } from "./service.ts";

//register
export const registerController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await registerService(req.body);
    
    res.cookie("token", result.token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
   });
   
    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result.user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Registration failed",
    });
  }
};

//login
export const loginController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await loginService(req.body);

    res.cookie("token", result.token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
   });
   
   res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
      },
    });
    
  } catch (error) {
    res.status(401).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
};

//logout
export const logoutController = (req: Request, res: Response) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};