import Reservation from '../models/on-call/reservation.model.js';
import sequelize from '../config/sequelize.js';
import logger from '../lib/logger/index.js';

class ReservationService {
    /**
     * Creates a new reservation.
     *
     * @param {Object} data - The reservation data.
     * @param {Date} data.checkInDate - The check-in date of the reservation.
     * @param {Date} data.checkOutDate - The check-out date of the reservation.
     * @param {number} data.totalAmount - The total amount of the reservation.
     * @param {number} data.RoomId - The ID of the associated room.
     * @param {number} data.UserId - The ID of the associated user.
     * @returns {Promise<Reservation>} - The created reservation.
     * @throws {Error} If an error occurs during the creation process.
     */
    async create(data) {
        const transaction = await sequelize.transaction();
        const { checkInDate, checkOutDate, totalAmount, RoomId, UserId } = data;

        try {
            const reservation = await Reservation.create({
                checkInDate,
                checkOutDate,
                totalAmount,
                RoomId,
                UserId
            }, { transaction });

            await transaction.commit();
            logger.log('Reservation Done Successfully')
            return reservation;
        } catch (err) {
            await transaction.rollback();
            logger.error(`Error creating reservation: ${err.message}`);
            throw err;
        }
    }

    /**
     * Retrieves a reservation by its ID.
     *
     * @param {number} id - The ID of the reservation to retrieve.
     * @returns {Promise<Reservation>} - The retrieved reservation.
     * @throws {Error} If the reservation with the specified ID does not exist.
     */
    async getById(id) {
        const reservation = await Reservation.findOne({
            where: { id },
            //include: [{ model: Room }, { model: User }]
        });
        if (!reservation) {
            throw new Error('Reservation not found');
        }
        return reservation;
    }

    /**
     * Updates an existing reservation.
     *
     * @param {number} id - The ID of the reservation to update.
     * @param {Object} data - The updated reservation data.
     * @returns {Promise<Reservation>} - The updated reservation.
     * @throws {Error} If the reservation with the specified ID does not exist.
     */
    async update(id, data) {
        const transaction = await sequelize.transaction();
        try {
            const reservation = await Reservation.findOne({ where: { id } });
            if (!reservation) {
                throw new Error('Reservation not found');
            }

            const updatedReservation = await reservation.update(data, { transaction });

            await transaction.commit();
            logger.log('Reservation Updated Sucessfully')
            return updatedReservation;
        } catch (err) {
            await transaction.rollback();
            logger.error(`Error updating reservation: ${err.message}`);
            throw err;
        }
    }

    /**
     * Deletes a reservation by its ID.
     *
     * @param {number} id - The ID of the reservation to delete.
     * @returns {Promise<Reservation>} - The deleted reservation.
     * @throws {Error} If the reservation with the specified ID does not exist.
     */
    async delete(id) {
        const transaction = await sequelize.transaction();
        try {
            const reservation = await Reservation.findOne({ where: { id } });
            if (!reservation) {
                throw new Error('Reservation not found');
            }

            await reservation.destroy({ transaction });

            await transaction.commit();
            logger.log('Reservation Cancelled Successfully')
            return reservation;
        } catch (err) {
            await transaction.rollback();
            logger.error(`Error deleting reservation: ${err.message}`);
            throw err;
        }
    }

    /**
     * Retrieves a list of reservations.
     *
     * @param {Object} params - Additional parameters for filtering the list.
     * @param {number} params.offset - The offset for paginating the results.
     * @param {number} params.limit - The maximum number of results to retrieve.
     * @returns {Promise<Reservation[]>} - An array of reservations.
     */
    async list(params) {
        const { offset, limit } = params;
        try {
            const reservations = await Reservation.findAll({
                where: {},
                //include: [{ model: Room }, { model: User }],
                offset: offset, limit: limit
            });
            return reservations;
        } catch (err) {
            logger.error(`Error listing reservations: ${err.message}`);
            throw err;
        }
    }
}

export default new ReservationService();