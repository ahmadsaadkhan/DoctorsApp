import { sequelize } from '../dbConfig.js'
import { DataTypes } from 'sequelize';

export const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'doctors',
  timestamps: false,
});