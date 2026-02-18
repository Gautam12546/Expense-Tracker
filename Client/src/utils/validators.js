export const validateExpense = (expense) => {
  const errors = {};

  // Validate amount
  if (!expense.amount) {
    errors.amount = 'Amount is required';
  } else if (isNaN(expense.amount)) {
    errors.amount = 'Amount must be a number';
  } else if (expense.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  } else if (expense.amount > 1000000) {
    errors.amount = 'Amount cannot exceed ₹10,00,000';
  }

  // Validate category
  if (!expense.category) {
    errors.category = 'Category is required';
  } else if (expense.category.trim().length < 2) {
    errors.category = 'Category must be at least 2 characters';
  }

  // Validate description
  if (!expense.description) {
    errors.description = 'Description is required';
  } else if (expense.description.trim().length < 3) {
    errors.description = 'Description must be at least 3 characters';
  } else if (expense.description.trim().length > 200) {
    errors.description = 'Description cannot exceed 200 characters';
  }

  // Validate date
  if (!expense.date) {
    errors.date = 'Date is required';
  } else {
    const selectedDate = new Date(expense.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(selectedDate.getTime())) {
      errors.date = 'Invalid date format';
    } else if (selectedDate > today) {
      errors.date = 'Date cannot be in the future';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};