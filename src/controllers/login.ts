
import express, { Request, Response } from 'express';
import {
    comparePassword,
    generateToken,
    hashPassword,
} from '../utils/auth';
import User from '../models/users'


const checkCredentials = async (req: Request, res: Response) => {
    console.log('hello from login')
    try {
        // Assuming you have a user model and a database query to fetch user data
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await comparePassword(
            req.body.password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        return res.status(200).json({ token, id: user._id, name: user.name,email:user.email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export default {checkCredentials}