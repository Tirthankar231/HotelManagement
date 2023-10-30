// room.controller.js
import RoomService from '../services/room.service.js';

class RoomController {
    async create(req, res, next) {
        try {
            const params = req.body;
            const data = await RoomService.create(params);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await RoomService.getById(id);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const params = req.body;
            const data = await RoomService.update(id, params);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const data = await RoomService.delete(id);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }

    async list(req, res, next) {
        try {
            const params = req.query;
            const data = await RoomService.list(params);
            res.json({ data });
        } catch (err) {
            next(err);
        }
    }
}

export default new RoomController();