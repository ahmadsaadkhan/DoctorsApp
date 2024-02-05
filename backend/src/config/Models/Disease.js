import { sequelize } from '../dbConfig.js'
import { DataTypes } from 'sequelize';

export const Disease = sequelize.define('Disease', {
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
  tableName: 'diseases',
  timestamps: false,
});