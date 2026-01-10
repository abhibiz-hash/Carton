import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from './prisma';


//route imports
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import userRoutes from './routes/userRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: '📦 Carton Backend is alive' })
});


app.listen(PORT, () => {
  console.log(`📦 Carton Server running on http://localhost:${PORT}`);
});