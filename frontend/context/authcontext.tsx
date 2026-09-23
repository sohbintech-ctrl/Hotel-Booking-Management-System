"use client";

import { createContext, useContext, useState,useEffect } from "react";
import { login as loginApi } from "@/api/auth";
import { register as registerApi } from "@/api/auth";
import { logout as logoutApi } from "@/api/auth";
import { getMe as getMeApi } from "@/api/user";
import { SignUpPayload } from "@/lib/validations/auth";
import { updateUser as updateUserApi } from "@/api/user";
import { toast } from "sonner";

type User = {
  id?: string;
  name: string;
  email: string;
  number: string;
  role?: "user" | "admin";
};


const AuthContext = createContext<{
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<User | void>;
  register: (data: SignUpPayload) => Promise<void>;
  getCurrentUser: () => Promise<User | void>;
  updateUser: (data: {
    name: string;
    number: string;
    email: string;
  }) => Promise<User>;
  logout: () => Promise<void>;
}>({
  user: null,
  login: async () => {},
  register: async () => {},
  getCurrentUser: async () => {},
  logout: async () => {},
  updateUser: async () => {
    throw new Error("Not implemented");
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (data: { email: string; password: string }) => {
     await loginApi(data);

     const currentUser=await getCurrentUser();
     return currentUser;
    
  };

  const register=async(data:SignUpPayload)=>{
    await registerApi(data);
    await getCurrentUser();
  }

  const getCurrentUser = async () => {
  try {
    const result = await getMeApi();

    setUser(result.data);
     return result.data;
  } catch (error) {
    setUser(null);
    return null;
  }
};

const logout = async () => {
  try {
    await logoutApi();
    setUser(null);
    toast.success("Logout successful");
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Logout failed"
    );
  }
};

const updateUser = async (data: { name: string; number: string; email:string}) => {
  const result = await updateUserApi(data);

  setUser(result.data);

  return result.data;
};
useEffect(() => {
  getCurrentUser();
}, []);

  return (
    <AuthContext.Provider value={{ user, login, register, getCurrentUser,logout,updateUser,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};