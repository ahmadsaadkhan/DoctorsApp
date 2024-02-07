import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const axiosService = {
  get: async (url, config = {}) => {
    try {
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  },
};

export default axiosService;
