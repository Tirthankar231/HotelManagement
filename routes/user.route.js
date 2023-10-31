import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { authorizeUser, authorizeAdmin } from '../middlewares/authorisation.js'
import { userSchema } from '../middlewares/apiParamsValidator.js';

const router = new Router();

// Create a new user
router.post('/createUsers', userSchema.validate, userController.createUser);

// Get a specific user by ID
router.get('/getUsersById/:id', authenticateToken, authorizeUser, userController.getUserById);

// Update a specific user by ID
router.put('/updateUsers/:id', authenticateToken, authorizeAdmin, userSchema.validate, userController.updateUser);

// Delete a specific user by ID
router.delete('/deleteUsers/:id', authenticateToken, authorizeAdmin, userController.deleteUser);

// Get a list of users
router.get('/getAllUsers', authenticateToken, userController.listUsers);

export default router;