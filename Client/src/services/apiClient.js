import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://expense-tracker-hddt.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - NO AUTH
apiClient.interceptors.request.use(
  (config) => {
    // No auth token logic here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - NO AUTH
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check if the server is running.');
    }
    
    switch (error.response.status) {
      case 400:
        throw new Error(error.response.data.errors?.join(', ') || 'Invalid data provided');
      case 404:
        throw new Error('Resource not found');
      case 409:
        throw new Error('Duplicate entry detected');
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error(error.response.data?.message || 'An unexpected error occurred');
    }
  }
);

export default apiClient;
