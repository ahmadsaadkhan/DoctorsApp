import { sequelize } from '../dbConfig.js'
import { DataTypes } from 'sequelize';

export const Visit = sequelize.define('Visit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  disease_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  visit_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'Visits', 
  timestamps: false 
});