import { format as dateFnsFormat, parseISO } from 'date-fns';

// Format currency to Indian Rupees
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0.00';
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format date to DD/MM/YYYY
export const formatDate = (dateString) => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
    return dateFnsFormat(date, 'dd/MM/yyyy');
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
};

// Format date for input field (YYYY-MM-DD)
export const formatDateForInput = (date = new Date()) => {
  return dateFnsFormat(date, 'yyyy-MM-dd');
};

// Capitalize first letter
export const capitalizeFirst = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};