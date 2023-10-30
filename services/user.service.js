import User from '../models/on-call/user.model.js';
import logger from '../lib/logger/index.js';

class UserService {
    /**
     * Creates a new user with the provided data.
     * @param {Object} data - User data to be used for creation.
     * @returns {Promise<Object>} A Promise that resolves to the created user object.
     * @throws {Error} If an error occurs during the creation process.
     */
    async createUser(data) {
        try {
            const user = await User.create(data);
            return user.toJSON();
        } catch (err) {
            // Log the error
            logger.error(`Error in createUser: ${err.message}`);
            throw err;
        }
    }

    /**
     * Retrieves a user by their ID.
     * @param {number} id - The ID of the user to retrieve.
     * @returns {Promise<Object>} A Promise that resolves to the user object.
     * @throws {Error} If the user with the specified ID is not found or an error occurs during retrieval.
     */
    async getUserById(id) {
        try {
            const user = await User.findOne({
                where: { id }
            });
            if (!user) {
                throw new Error('User not found');
            }
            return user.toJSON();
        } catch (err) {
            // Log the error
            logger.error(`Error in getUserById: ${err.message}`);
            throw err;
        }
    }

    /**
     * Updates an existing user with the provided data.
     * @param {number} id - The ID of the user to be updated.
     * @param {Object} data - Updated user data.
     * @returns {Promise<Object>} A Promise that resolves to the updated user object.
     * @throws {Error} If the user with the specified ID is not found or an error occurs during update.
     */
    async updateUser(id, data) {
        try {
            const user = await User.findOne({
                where: { id }
            });
            if (!user) {
                throw new Error('User not found');
            }
            await user.update(data);
            return user.toJSON();
        } catch (err) {
            // Log the error
            logger.error(`Error in updateUser: ${err.message}`);
            throw err;
        }
    }

    /**
     * Deletes a user by their ID.
     * @param {number} id - The ID of the user to be deleted.
     * @returns {Promise<Object>} A Promise that resolves to the deleted user object.
     * @throws {Error} If the user with the specified ID is not found or an error occurs during deletion.
     */
    async deleteUser(id) {
        try {
            const user = await User.findOne({
                where: { id }
            });
            if (!user) {
                throw new Error('User not found');
            }
            await user.destroy();
            return user.toJSON();
        } catch (err) {
            // Log the error
            logger.error(`Error in deleteUser: ${err.message}`);
            throw err;
        }
    }

    /**
     * Retrieves a list of all users.
     * @returns {Promise<Array>} A Promise that resolves to an array of user objects.
     * @throws {Error} If an error occurs during the retrieval process.
     */
    async listUsers() {
        try {
            const users = await User.findAll();
            return users.map(user => user.toJSON());
        } catch (err) {
            // Log the error
            logger.error(`Error in listUsers: ${err.message}`);
            throw err;
        }
    }
}

export default new UserService();