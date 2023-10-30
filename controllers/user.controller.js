import UserService from '../services/user.service.js';

class UserController {
    async createUser(req, res, next) {
        try {
            const userData = req.body;
            const user = await UserService.createUser(userData);
            res.json({ user });
        } catch (err) {
            next(err);
        }
    }

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            res.json({ user });
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const userData = req.body;
            const user = await UserService.updateUser(id, userData);
            res.json({ user });
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.deleteUser(id);
            res.json({ user });
        } catch (err) {
            next(err);
        }
    }

    async listUsers(req, res, next) {
        try {
            const users = await UserService.listUsers();
            res.json({ users });
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();
