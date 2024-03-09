import express from 'express';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken';
import userModel from '../models/UserModel.js';

const router = express.Router();

router.post('/login', [
    check("email", "Email is required ").isEmail(),], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            })
        }
        try {
            const { email, password } = req.body;

            if (!password) return res.status(401).json({ message: 'Please provide password' });
            // Check if the user exists
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Check if the password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

export default router;