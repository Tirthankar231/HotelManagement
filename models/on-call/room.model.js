import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    amenities: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true,
    indexes: [
        {
            fields: ['type'], // Add an index on the 'type' field
        },
        {
            fields: ['price'], // Add an index on the 'price' field
        }
    ]
});

Room.associate = function (models) {
    Room.belongsTo(models.Hotel);
    Room.hasMany(models.Reservation);
};

export default Room;
