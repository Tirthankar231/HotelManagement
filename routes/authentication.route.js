import { Router } from 'express';
import authenticationController from '../controllers/authentication.controller.js';

const router = new Router();

// Login route
router.post('/login', authenticationController.login);

export default router;