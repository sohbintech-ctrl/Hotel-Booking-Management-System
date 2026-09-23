import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./modules/config/db.ts";
import userRoutes from "./modules/user/routes.js";
import authRoutes from "./modules/auth/routes.ts";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});