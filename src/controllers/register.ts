import { Request, Response } from 'express';
import {
    generateToken,
    hashPassword,
} from '../utils/auth';

import User from '../models/users'

const registerUser = async (req: Request, res: Response) => {
    try {
        const Check = await User.findOne({ email: req.body.email });
        if (Check) {
            return res.status(401).json({ message: 'Email Alredy Exist', id: Check._id });
        }
        else {
            const hashedPassword = await hashPassword(req.body.password)
            await User.insertMany({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            })
            //await sendEmail(req.body.email,`here is your verification code :${code}`,'mealEmu Verification code');
            return res.status(200).json({ message: 'Added New User' });

        }

    } catch (error) {
        console.log(error)

    }

}

export default {registerUser}