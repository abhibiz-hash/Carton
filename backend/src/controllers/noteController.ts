import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../prisma';
import { z } from 'zod';

const noteSchema = z.object({
    title: z.string().min(1, 'title is required'),
    content: z.string().min(1, 'Content is required'),
    category: z.string().optional(),
    isBookmarked: z.boolean().optional(),
});

//get all notes
export const getNotes = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        const { search, category } = req.query;

        const whereClause: any = {
            userId,
        };

        if (search) {
            whereClause.OR = [
                { title: { contains: String(search), mode: 'insensitive' } },
                { content: { contains: String(search), mode: 'insensitive' } },
                { category: { contains: String(search), mode: 'insensitive' } },
            ];
        }

        if (category) {
            whereClause.category = String(category);
        }

        const notes = await prisma.note.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
        });

        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
};

// Create a Note
export const createNote = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        const parsedData = noteSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({ error: parsedData.error.issues[0].message });
            return;
        }

        const { title, content, category, isBookmarked } = parsedData.data;

        const note = await prisma.note.create({
            data: {
                title,
                content,
                category: category || 'General',
                isBookmarked: isBookmarked || false,
                userId: userId!,
            },
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
};

//UPDATE A NOTE
export const updateNote = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const parsedData = noteSchema.partial().safeParse(req.body);

        if (!parsedData.success) {
            res.status(400).json({ error: parsedData.error.issues[0].message });
            return;
        }

        const existingNote = await prisma.note.findUnique({ where: { id } });

        if (!existingNote) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }

        if (existingNote.userId !== userId) {
            res.status(403).json({ error: 'Not authorized to update this note' });
            return;
        }

        const updatedNote = await prisma.note.update({
            where: { id },
            data: parsedData.data,
        });

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
};

// DELETE A NOTE
export const deleteNote = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const note = await prisma.note.findUnique({ where: { id } });

        if (!note) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }

        if (note.userId !== userId) {
            res.status(403).json({ error: 'Not authorized to delete this note' });
            return;
        }

        await prisma.note.delete({ where: { id } });

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
};
