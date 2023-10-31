import User from '../models/on-call/user.model.js';
import jwt from 'jsonwebtoken';
import logger from '../lib/logger/index.js';

class AuthenticationService {
    /**
     * Attempts to log in a user with the provided username and password.
     * @param {string} username - The username of the user attempting to log in.
     * @param {string} password - The password provided by the user for authentication.
     * @returns {Promise<string>} A Promise that resolves to a JWT token.
     * @throws {Error} If the user is not found or the password is invalid.
     */
    async login(username, password) {
        try {
            const user = await User.findOne({
                where: { username }
            });

            if (!user) {
                const errorMessage = 'User not found';
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }

            const isValid = await user.authenticate(password);

            if (!isValid) {
                const errorMessage = 'Invalid password';
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }

            const token = this.generateToken(user);

            logger.log('User logged in successfully'); // Logging successful login

            return token;
        } catch (err) {
            logger.error(err.message);
            throw err;
        }
    }

    /**
     * Generates a JWT token for a user.
     * @param {object} user - The user object for which to generate the token.
     * @returns {string} The generated JWT token.
     */
    generateToken(user) {
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            'secretkey',
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        return token;
    }
}

export default new AuthenticationService();