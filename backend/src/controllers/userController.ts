import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../prisma';
import { z } from 'zod';

// Validation for updating profile
const updateUserSchema = z.object({
    name: z.string().min(2).optional(),
    bio: z.string().max(160, "Bio too long").optional(),
    avatar: z.string().optional(),
});

// 1. GET CURRENT USER
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                bio: true,
                avatar: true,
                createdAt: true,
            },
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

// 2. UPDATE CURRENT USER
export const updateMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        const parsedData = updateUserSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({ error: parsedData.error.issues[0].message });
            return;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: parsedData.data,
            select: {
                id: true,
                name: true,
                bio: true,
                avatar: true,
                email: true,
            },
        });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};