import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    }
}, {
    freezeTableName: true,
});

User.prototype.authenticate = function (password) {
    const user = this;
    return new Promise((resolve, reject) => {
        user.isPasswordValid(password).then(() => resolve(true)).catch((err) => reject(err));
    });
};

User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
};

User.hashPassword = function (user) {
    return new Promise((resolve, reject) => {
        if (!user.changed('password')) return resolve();
        bcrypt.hash(user.getDataValue('password'), 10, (err, hash) => {
            if (err) reject(err);
            else {
                user.setDataValue('password', hash);
                resolve(hash);
            }
        });
    });
};

User.beforeCreate(User.hashPassword);
User.beforeUpdate(User.hashPassword);

User.associate = function (models) {
    User.belongsToMany(models.Role, { through: 'UserRole' });
    User.hasMany(models.Reservation);
};

User.prototype.getRoles = async function () {
    const roles = await this.getRoles({ attributes: ['name'] });
    return roles.map(role => role.name);
};

export default User;