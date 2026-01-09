import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from './prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: '📦 Carton Backend is alive' })
});


//temporary to check route
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany(); // Ask DB for all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`📦 Carton Server running on http://localhost:${PORT}`);
});