import express from 'express';
import connToDB from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import authRoutes from './routes/authRoutes.js';
import followerRoutes from './routes/followerRoutes.js';
import postRoutes from './routes/postRoutes.js';
import verifyToken from './middlewares/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/user/posts', verifyToken, postRoutes);
app.use('/api/user/follow', verifyToken, followerRoutes);

app.get('/', (req, res) => {
    res.send('Social Networking API');
});

app.listen(PORT, () => {
    connToDB();
    console.log(`Server is running on port ${PORT}`);
});
