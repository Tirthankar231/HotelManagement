import AuthenticationService from '../services/authentication.service.js';

class AuthenticationController {
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await AuthenticationService.login(username, password);
            res.json({ user });
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthenticationController();
