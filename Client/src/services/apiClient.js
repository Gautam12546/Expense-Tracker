import axios from 'axios';
import authService from './authService';

const API_BASE_URL =  import.meta.env.VITE_API_URL || 'https://expense-tracker-hddt.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check if the server is running.');
    }
    
    switch (error.response.status) {
      case 400:
        throw new Error(error.response.data.errors?.join(', ') || 'Invalid data provided');
      case 401:
        throw new Error('Please login to continue');
      case 403:
        throw new Error('You do not have permission to perform this action');
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
