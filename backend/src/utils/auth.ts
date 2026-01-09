import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
    throw new Error("FATAL ERROR: JWT_SECRET is not defined in .env file");
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (plain: string, hashed: string) => {
    return await bcrypt.compare(plain, hashed);
};

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, SECRET, { expiresIn: '7d' });
}
