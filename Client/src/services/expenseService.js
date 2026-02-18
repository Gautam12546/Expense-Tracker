import apiClient from './apiClient';

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const expenseService = {
  // Get all expenses with optional filters
  async getExpenses(params = {}) {
    let lastError;
    
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        const response = await apiClient.get('/expenses', { params });
        return response;
      } catch (error) {
        lastError = error;
        if (i < MAX_RETRIES - 1) {
          await wait(RETRY_DELAY * Math.pow(2, i)); // Exponential backoff
        }
      }
    }
    
    throw lastError;
  },

  // Create new expense
  async createExpense(expenseData) {
    let lastError;
    
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        const response = await apiClient.post('/expenses', expenseData);
        return response;
      } catch (error) {
        lastError = error;
        // Don't retry if it's a validation error (400) or duplicate (409)
        if (error.message?.includes('Invalid data') || error.message?.includes('Duplicate')) {
          throw error;
        }
        if (i < MAX_RETRIES - 1) {
          await wait(RETRY_DELAY * Math.pow(2, i));
        }
      }
    }
    
    throw lastError;
  },

  // Get expense summary (nice-to-have)
  async getSummary() {
    try {
      const response = await apiClient.get('/expenses/summary');
      return response;
    } catch (error) {
      console.error('Failed to fetch summary:', error);
      throw error;
    }
  }
};