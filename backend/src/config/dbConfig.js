import { Sequelize } from 'sequelize';

//local
export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'pmapp',
  // logging: true
});

// Enable logging
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});