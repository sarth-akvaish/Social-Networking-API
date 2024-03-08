import express from "express";
import Follower from "../models/followerModel.js";
import User from '../models/UserModel.js';

const router = express.Router();

router.post('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const followerId = req.userId;

        // Check if the follower and user to follow exist
        const userToFollow = await User.findById(userId);
        const followerUser = await User.findById(followerId);

        // console.log('usertoFollow : ', userToFollow, 'followerUser', followerUser)

        if (!userToFollow || !followerUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the follower is already following the user
        const existingFollower = await Follower.findOne({ user: userId, follower: followerId });
        if (existingFollower) {
            return res.status(400).json({ message: 'User is already followed' });
        }

        // Create a new follower relationship
        const newFollower = new Follower({ user: userId, follower: followerId });
        await newFollower.save();

        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to unfollow a user
router.post('/unfollow/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const followerId = req.userId;

        // Check if the follower relationship exists
        const existingFollower = await Follower.findOneAndDelete({ user: userId, follower: followerId });
        if (!existingFollower) {
            return res.status(404).json({ message: 'User is not followed' });
        }

        // Remove the follower relationship
        // await existingFollower.remove();

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to retrieve followers of a user
router.get('/followers', async (req, res) => {
    try {
        const userId = req.userId;

        // Find followers of the user
        const followers = await Follower.find({ user: userId }).populate('follower', 'username');
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to retrieve users followed by a user
router.get('/following', async (req, res) => {
    try {
        const userId = req.userId;

        // Find users followed by the user
        const following = await Follower.find({ follower: userId }).populate('user', 'username');
        res.status(200).json(following);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;