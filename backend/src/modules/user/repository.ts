import { User } from "./schema.js";

export const createUser = async (data: {
  name: string;
  email: string;
  number: string;
  password: string;
  role?: "user" | "admin";
}) => {
  return await User.create(data);
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findAllUsers = async () => {
  return await User.find();
};

export const findUserById = async (id: string) => {
  return await User.findById(id).select("-password");
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export const updateUser = async (
  userId: string,
  data: {
    name: string;
    number: string;
    email:string;
  }
) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      name: data.name,
      number: data.number,
      email:data.email,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");
};
