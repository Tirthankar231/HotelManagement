import { Router } from 'express';
import roomController from '../controllers/room.controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { authorizeUser, authorizeAdmin } from '../middlewares/authorisation.js'
import { roomSchema } from '../middlewares/apiParamsValidator.js';

const router = new Router();

// Create a new room
router.post('/createRooms', authenticateToken, authorizeAdmin, roomSchema.validate, roomController.create);

// Get a specific room by ID
router.get('/getRoomsById/:id', authenticateToken, authorizeUser, roomController.getById);

// Update a specific room by ID
router.put('/updateRooms/:id', authenticateToken, authorizeAdmin, roomSchema.validate, roomController.update);

// Delete a specific room by ID
router.delete('/deleteRooms/:id', authenticateToken, authorizeAdmin, roomController.delete);

// Get a list of rooms
router.get('/getAllRooms', authenticateToken, roomController.list);

export default router;
