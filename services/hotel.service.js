import Hotel from '../models/on-call/hotel.model.js';
import sequelize from '../config/sequelize.js';
import Room from '../models/on-call/room.model.js';
import Reservation from '../models/on-call/reservation.model.js';
import logger from '../lib/logger/index.js';

class HotelService {
    async create(data) {
        const transaction = await sequelize.transaction();
        const { name, address, city, state } = data;
        try {
            const hotelExists = await Hotel.findOne({ where: { name } });
            
            if(hotelExists){
                logger.warn('Hotel already exists');
            }

            const hotel = await Hotel.create({
                name,
                address,
                city,
                state,
            }, {transaction});

            await transaction.commit();
            logger.log('Hotel created successfully');
            return hotel;
        } catch (err) {
            await transaction.rollback();
            logger.error(`Error creating hotel: ${err.message}`);
            throw err;
        }
    }

    async list(params) {
        try {
            const {offset, limit} = params;
            const hotels = await Hotel.findAll({
                where: {},
                include: [{ model: Room}, {model: Reservation}],
                offset: offset, limit: limit
            });
            return hotels;
        } catch (err) {
            logger.error(`Error listing hotels: ${err.message}`);
            throw err;
        }
    }

    async getById(id) {
        const hotel = await Hotel.findOne({
            where: { id },
        });
        if (!hotel) {
            throw new Error('Hotel not found');
        }
        return hotel;
    }

    async update(id, data) {
        const transaction = await sequelize.transaction();
        try {
            const hotel = await Hotel.findOne({ where: { id } });
            if (!hotel) {
                throw new Error('Hotel not found');
            }

            const updatedHotel = await hotel.update(data, { transaction });

            await transaction.commit();
            logger.log('Hotel updated successfully');
            return updatedHotel;
        } catch (err) {
            await transaction.rollback();
            logger.error(`Error updating hotel: ${err.message}`);
            throw err;
        }
    }

    async delete(id) {
        const transaction = await sequelize.transaction();
        try {
            const hotel = await Hotel.findOne({ where: { id } });
            if (!hotel) {
                throw new Error('Hotel not found');
            }

            await hotel.destroy({ transaction });

            await transaction.commit();
            logger.log('Hotel deleted successfully');
            return hotel;
        } catch (err) {
            await transaction.rollback();
            logger.error(`Error deleting hotel: ${err.message}`);
            throw err;
        }
    }
}

export default new HotelService();