import { Router } from 'express';
import reservationController from '../controllers/reservation.controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { authorizeUser, authorizeAdmin } from '../middlewares/authorisation.js'

const router = new Router();

// Create a new reservation
router.post('/createReservations', authenticateToken, authorizeAdmin, reservationController.create);

// Get a specific reservation by ID
router.get('/getReservationsById/:id', authenticateToken, authorizeUser, reservationController.getById);

// Update a specific reservation by ID
router.put('/updateReservations/:id', authenticateToken, authorizeAdmin, reservationController.update);

// Delete a specific reservation by ID
router.delete('/cancelReservations/:id', authenticateToken, authorizeAdmin, reservationController.delete);

// Get a list of reservations
router.get('/getAllReservations', authenticateToken, reservationController.list);

export default router;
