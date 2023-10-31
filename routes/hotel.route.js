import { Router } from 'express';
import hotelController from '../controllers/hotel.controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { authorizeUser, authorizeAdmin } from '../middlewares/authorisation.js'
import { hotelSchema } from '../middlewares/apiParamsValidator.js';

const router = new Router();

// Create a new hotel
router.post('/hotels', authenticateToken, authorizeAdmin, hotelSchema.validate, hotelController.create);

// Get a specific hotel by ID
router.get('/getHotelsById/:id', authenticateToken, authorizeUser, hotelController.getById);

// Update a specific hotel by ID
router.put('/updateHotels/:id', authenticateToken, authorizeAdmin, hotelSchema.validate, hotelController.update);

// Delete a specific hotel by ID
router.delete('/deleteHotels/:id', authenticateToken, authorizeAdmin, hotelController.delete);

// Get a list of hotels
router.get('/getAllHotels', authenticateToken, hotelController.list);

export default router;
