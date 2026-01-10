import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import prisma from "./prisma";

// route imports
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "📦 Carton Backend is alive" });
});

//shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`📦 Carton Server running on port ${PORT}`);
});