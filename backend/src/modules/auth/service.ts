import argon2 from "argon2";
import { createUserService } from "../user/service.js";
import { findUserByEmail } from "../user/repository.js";
import jwt from "jsonwebtoken";

export const registerService = async (data: {
  name: string;
  email: string;
  number: string;
  password: string;
}) => {
  const { name, email, number, password } = data;

  if (!name || !email || !number || !password) {
    throw new Error("Name, email, number and password are required");
  }

  const user = await createUserService({
    name,
    email,
    number,
    password,
  });
 
  const token = jwt.sign(
    {
      userId: user._id.toString(), 
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
      role: user.role,
    },
  };
};

export const loginService = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await argon2.verify(
    user.password,
    password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
      role: user.role,
    },
  };
};