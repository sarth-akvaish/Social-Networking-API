import bcrypt from "bcryptjs";
import express from "express";
import { check, validationResult } from 'express-validator'
import userModel from "../models/UserModel.js";

const router = express.Router();

router.post('/register', [
    check("username", "Username is required ").notEmpty(),
    check("email", "Email is required ").isEmail(),
    check("password", "More than 6 characters are required ").isLength({
        min: 6,
    }),], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            })
        }
        try {
            const { username, email, password } = req.body;

            // Check if the email is already registered
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already registered' });
            }

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user document
            const newUser = new userModel({
                username,
                email,
                password: hashedPassword
            });

            // Save the new user to the database
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });


export default router;