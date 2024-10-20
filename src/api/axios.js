// axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, // Replace with your base URL
  timeout: 10000, // Optional timeout, in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // You can also add authorization headers or others here
  },
});

const api = {
  // GET request
  get: async (url, params = {}, config = {}) => {
    try {
      const response = await axiosInstance.get(url, { params, ...config });
      return response.data;
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error('PUT request error:', error);
      throw error;
    }
  },

  // DELETE request
  del: async (url, config = {}) => {
    try {
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      console.error('DELETE request error:', error);
      throw error;
    }
  },
};

export default api;
