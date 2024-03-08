import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.userId = decoded.userId;
        next();
        // return res.status(201).json({ message: "Authenticated" })
    });
};

export default verifyToken;