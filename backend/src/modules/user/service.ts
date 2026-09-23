import {
  createUser,
  findUserByEmail,
  findAllUsers,
  findUserById,
  deleteUser,
  updateUser,
} from "./repository.js";
import argon2 from "argon2";

export const createUserService = async (data: {
  name: string;
  email: string;
  number: string;
  password: string;
  role?: "user" | "admin";
}) => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

   const hashedPassword = await argon2.hash(data.password);


  const user = await createUser({
    ...data,
    password:hashedPassword,
  });
 
  return user;
};

export const getAllUsersService = async () => {
  return await findAllUsers();
};

export const getMeService = async (userId: string) => {
  return await findUserById(userId);
};

export const deleteUserService = async (id: string) => {
  return await deleteUser(id);
};

export const updateUserService = async (
  userId: string,
  data: {
    name: string;
    number: string;
    email:string;
  }
) => {
  const updatedUser = await updateUser(userId, data);

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};