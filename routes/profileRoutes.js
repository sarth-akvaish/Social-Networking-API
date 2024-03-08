import express from "express";
import profileModel from "../models/profileModel.js";
import verifyToken from '../middlewares/auth.js'
import userModel from "../models/UserModel.js";

const router = express.Router();

router.post('/create', verifyToken, async (req, res) => {
    try {
        const { username, profilePicURL, bio } = req.body;
        // Check if the user already has a profile
        const existingProfile = await profileModel.findOne({ user: req.userId });
        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists for this user' });
        }

        const user = await userModel.findById(req.userId);

        // Create a new profile document
        const newProfile = new profileModel({
            user: req.userId,
            username: user.username || username,
            profilePicURL,
            bio
        });

        // Save the new profile to the database
        await newProfile.save();

        res.status(201).json({ message: 'Profile created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/update', verifyToken, async (req, res) => {
    try {
        const { username, profilePicURL, bio } = req.body;

        // Check if the user has a profile
        const existingProfile = await profileModel.findOne({ user: req.userId });
        if (!existingProfile) {
            return res.status(404).json({ message: 'Profile not found for this user' });
        }

        // Update the profile document
        existingProfile.username = username || existingProfile.username;
        existingProfile.profilePicURL = profilePicURL || existingProfile.profilePicURL;
        existingProfile.bio = bio || existingProfile.bio;

        // Save the updated profile to the database
        await existingProfile.save();

        res.status(200).json({ message: 'Profile updated successfully', existingProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/delete', verifyToken, async (req, res) => {
    try {

        const existingProfile = await profileModel.findOneAndDelete({ user: req.userId });
        if (!existingProfile) {
            return res.status(404).json({ message: 'Profile not found for this user' });
        }

        // console.log(existingProfile)

        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/view', verifyToken, async (req, res) => {
    try {
        const existingProfile = await profileModel.findOne({ user: req.userId });
        if (!existingProfile) {
            return res.status(404).json({ message: 'Profile not found for this user' });
        }

        res.status(200).json({ profile: existingProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;