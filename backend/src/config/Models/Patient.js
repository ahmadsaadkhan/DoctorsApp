import { sequelize } from '../dbConfig.js'
import { DataTypes } from 'sequelize';

export const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    patient_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other')
    },
    disease: {
        type: DataTypes.INTEGER
    },
    phone_number: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'On Hold', 'Discharged')
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Patients',
    timestamps: false
});