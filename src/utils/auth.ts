import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secretKey = 'wsvKwJyNXPx3ST2xo8FnQTnY58tVZaXW';

interface CustomRequest extends Request {
    userId?: string;
}

export const generateToken = (userId: string): string => {
    const payload = { userId };
    const options = { expiresIn: '3650d' };
    return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): any => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)

    if (!token) {
        console.log("no token found")
        return res.status(401).json({ message: 'Authorization token not found' });
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};
