import { Sequelize, Op } from 'sequelize';
import {
  Patient,
  Disease,
  Doctor,
  Visit
} from '../config/Relations.js';

export const getAllPatients = async (req, res) => {
  const filters = req.body;
  try {
    const whereClause = {};
    if (filters.age) {
      whereClause.age = filters.age;
    }
    if (filters.disease) {
      whereClause.disease = filters.disease;
    }
    if (filters.gender) {
      whereClause.gender = filters.gender;
    }
    const results = await Patient.findAll({
      where: whereClause,
      include: [{ model: Disease }]
    });
    res.status(200).json({ success: true, data: results });

  } catch (error) {
    throw new Error(error.message);
  }
}

export const getAllDiseases = async (req, res) => {
  try {
    const results = await Disease.findAll();
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getAllDoctors = async (req, res) => {
  try {
    const results = await Doctor.findAll();
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    throw new Error(error.message);
  }
}

export const saveOrUpdatePatient = async (req, res) => {
  const userData = req.body;
  try {
    let patient;
    if (userData.id) {
      patient = await Patient.findByPk(userData.id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      await patient.update({
        patient_name: userData.patient_name,
        age: userData.age,
        gender: userData.gender,
        disease: userData.disease,
        phone_number: userData.phone_number,
        address: userData.address,
        status: userData.status,
        updated_at: new Date(),
      });
    } else {
      patient = await Patient.create({
        patient_name: userData.patient_name,
        age: userData.age,
        gender: userData.gender,
        disease: userData.disease,
        phone_number: userData.phone_number,
        address: userData.address,
        status: userData.status,
        created_at: new Date(),
      });
    }
    return res.status(200).json({ success: true, data: patient.id });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByPk(id, { include: [Disease] });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    return res.status(200).json({ success: true, data: patient });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    await patient.destroy();
    return res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const saveVisit = async (req, res) => {
  try {
    const visitData = req.body;
    const visit = await Visit.create({
      disease_id: visitData.disease_id,
      doctor_id: visitData.doctor_id,
      patient_id: visitData.patient_id,
      visit_time: visitData.visit_time,
      created_at: new Date(),
    });
    return res.status(201).json({ success: true, data: visit.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllVisits = async (req, res) => {
  const { id } = req.params;
  try {
    const visits = await Visit.findAll({
      where: { patient_id: id },
      include: [
        { model: Disease },
        { model: Doctor }
      ]
    });
    return res.status(200).json({ success: true, data: visits });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVisit = async (req, res) => {
  try {
    const visit = await Visit.findByPk(req.params.id);
    if (!visit) {
      res.status(404).json({ message: 'Visit not found' });
      return;
    }
    return res.status(201).json({ success: true, data: visit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteVisit = async (req, res) => {
  try {
    const visit = await Visit.findByPk(req.params.id);
    if (!visit) {
      res.status(404).json({ message: 'Visit not found' });
      return;
    }
    await visit.destroy();
    return res.status(200).json({ message: 'Visit deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


