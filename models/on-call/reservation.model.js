import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
    },
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    freezeTableName: true,
});

Reservation.associate = function (models) {
    Reservation.belongsTo(models.Room);
    Reservation.belongsTo(models.User);
};

export default Reservation;
