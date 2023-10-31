import Joi from 'joi';

export const hotelSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().allow(null, ''),
    city: Joi.string().allow(null, ''),
    state: Joi.string().allow(null, '')
});

export const reservationSchema = Joi.object({
    checkInDate: Joi.date().iso().required(),
    checkOutDate: Joi.date().iso().required(),
    totalAmount: Joi.number().positive().required()
});

export const roomSchema = Joi.object({
    number: Joi.number().integer().positive().required(),
    type: Joi.string().required(),
    capacity: Joi.number().integer().positive().required(),
    price: Joi.number().positive().required(),
    amenities: Joi.string().allow(null, '')
});

export const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('admin', 'user').required(),
    fullName: Joi.string().required(),
    roles: Joi.array().items(Joi.string())
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});
