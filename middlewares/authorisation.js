import logger from '../lib/logger/index.js'

export const authorizeUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
        next();
    } else {
        logger.warn('Unauthorized access: User role required');
        return res.status(403).json({ message: 'Forbidden' });
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        logger.warn('Unauthorized access: Admin role required');
        return res.status(403).json({ message: 'Forbidden' });
    }
};
