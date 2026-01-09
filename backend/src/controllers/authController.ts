import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../prisma';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';


const registerSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    bio: z.string().optional(),
    avatar: z.string().optional(),
});

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedData = registerSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({ error: parsedData.error.issues[0].message });
            return;
        };

        const { name, email, password, bio, avatar } = parsedData.data;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        };

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                bio,
                avatar: avatar || 'avatar-1',
            },
        });

        const token = generateToken(user.id);

        res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                bio: bio,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong during registration' });
    }
};

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedData = loginSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({ error: parsedData.error.issues[0].message });
            return;
        }

        const { email, password } = parsedData.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, email: user.email, avatar: user.avatar } });

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong during login' });
    }
};