import ReservationService from '../services/reservation.service.js';

class ReservationController {
    async create(req, res, next) {
        try {
            const params = req.body;
            const data = await ReservationService.create(params);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await ReservationService.getById(id);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const params = req.body;
            const data = await ReservationService.update(id, params);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const data = await ReservationService.delete(id);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async list(req, res, next) {
        try {
            const params = req.query;
            const data = await ReservationService.list(params);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }
}

export default new ReservationController();
