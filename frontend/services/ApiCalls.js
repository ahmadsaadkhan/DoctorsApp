import axiosService from './ApiService';

export const getPatients = async (filters) => {
  try {
    const result = await axiosService.post('/patients', filters);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchDiseases = async () => {
  try {
    const result = await axiosService.get('/diseases');
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const savePatient = async (data) => {
  try {
    const result = await axiosService.post('/save-patient', data);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getPatient = async (id) => {
  try {
    const result = await axiosService.get(`/get-patient/${id}`);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const deletePatient = async (id) => {
  try {
    const result = await axiosService.delete(`/delete-patient/${id}`);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchDoctors = async () => {
  try {
    const result = await axiosService.get('/doctors');
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getVisits = async (id) => {
  try {
    const result = await axiosService.get(`/visits/${id}`);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const saveVisit = async (data) => {
  try {
    const result = await axiosService.post('/save-visit', data);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getVisit = async (id) => {
  try {
    const result = await axiosService.get(`/get-visit/${id}`);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const deleteVisit = async (id) => {
  try {
    const result = await axiosService.delete(`/delete-visit/${id}`);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
