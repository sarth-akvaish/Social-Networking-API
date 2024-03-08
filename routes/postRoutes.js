import express from 'express'
import Post from '../models/postModel.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(401).json({ message: 'Please provide some content' });
        const newPost = new Post({
            text,
            user: req.userId
        });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/update/:postId', async (req, res) => {
    try {
        const { text } = req.body;
        const { postId } = req.params;
        const updatedPost = await Post.findOneAndUpdate(
            { _id: postId, user: req.userId }, // Only allow updating posts belonging to the authenticated user
            { text },
            { new: true } // Return the updated post
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found or you are not authorized to update this post' });
        }
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/viewAll', async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.find({ user: req.userId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found or you are not authorized to view this post' });
        }
        res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/delete/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const deletedPost = await Post.findOneAndDelete({ _id: postId, user: req.userId });
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found or you are not authorized to delete this post' });
        }
        res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;