const validateExpense = (req, res, next) => {
  const { amount, category, description, date } = req.body;
  const errors = [];

  // Validate amount
  if (!amount) {
    errors.push('Amount is required');
  } else if (isNaN(amount)) {
    errors.push('Amount must be a number');
  } else if (amount <= 0) {
    errors.push('Amount must be greater than 0');
  } else if (amount > 1000000) {
    errors.push('Amount cannot exceed ₹10,00,000');
  }

  // Validate category
  if (!category) {
    errors.push('Category is required');
  } else if (typeof category !== 'string') {
    errors.push('Category must be a string');
  } else if (category.trim().length < 2) {
    errors.push('Category must be at least 2 characters');
  }

  // Validate description
  if (!description) {
    errors.push('Description is required');
  } else if (typeof description !== 'string') {
    errors.push('Description must be a string');
  } else if (description.trim().length < 3) {
    errors.push('Description must be at least 3 characters');
  } else if (description.trim().length > 200) {
    errors.push('Description cannot exceed 200 characters');
  }

  // Validate date
  if (!date) {
    errors.push('Date is required');
  } else {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Invalid date format');
    } else if (parsedDate > new Date()) {
      errors.push('Date cannot be in the future');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  // Sanitize inputs
  req.body.category = category.trim();
  req.body.description = description.trim();
  
  next();
};

module.exports = validateExpense;