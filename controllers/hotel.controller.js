import HotelService from '../services/hotel.service.js';

class HotelController {
    async create(req, res, next) {
        try {
            const params = req.body;
            const data = await HotelService.create(params);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await HotelService.getById(id);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const params = req.body;
            const data = await HotelService.update(id, params);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const data = await HotelService.delete(id);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async list(req, res, next) {
        try {
            const params = req.query;
            const data = await HotelService.list(params);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }
}

export default new HotelController();
