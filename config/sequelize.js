import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('hotel', 'postgres', 'Tirtha@4321', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
