import { Router } from 'express';
import authenticationController from '../controllers/authentication.controller.js';
import { loginSchema } from '../middlewares/apiParamsValidator.js';

const router = new Router();

// Login route
router.post('/login', loginSchema.validate, authenticationController.login);

export default router;