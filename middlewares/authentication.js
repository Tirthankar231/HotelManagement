import jwt from 'jsonwebtoken';
import logger from '../lib/logger/index.js';

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        logger.error('Unauthorized access: No token provided');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'your_secret_key_here', (err, user) => {
        if (err) {
            logger.error('Invalid token');
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};