import { Request, Response, CookieOptions } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { signUpSchema, signInSchema } from '../validation/auth.validation';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// const cookieOptions  : CookieOptions = {
//     httpOnly: true, 
//     secure: false,
//     sameSite: 'none', 
//     maxAge: 60 * 60 * 1000,  
// };

export const signup = async (req: Request, res: Response): Promise<any> => {
    const validationData = signUpSchema.parse(req.body);
    const { username, email, password } = validationData;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );


        res.status(201).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none", // "strict" | "lax" | "none" (secure must be true)
        }).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const signin = async (req: Request, res: Response): Promise<any> => {
    const validationData = signInSchema.parse(req.body);
    const { email, password } = validationData;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none", // "strict" | "lax" | "none" 
        }).json({
            message: 'Sign-in successful',
            token,
            user: { username: user.username, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

