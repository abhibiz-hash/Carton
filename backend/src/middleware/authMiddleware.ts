import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
const SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET) as { userId: string };

        req.userId = decoded.userId;

        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
};