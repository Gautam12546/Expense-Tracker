const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0'],
    set: v => Math.round(v * 100) / 100, // Store with 2 decimal places
    get: v => v.toFixed(2) // Return formatted
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: {
      values: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Other'],
      message: '{VALUE} is not a valid category'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    validate: {
      validator: function(v) {
        return v <= new Date(); // Cannot be future date
      },
      message: 'Date cannot be in the future'
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  // For idempotency - prevent duplicate submissions
  requestId: {
    type: String,
    unique: true,
    sparse: true // Allow null values
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

// Index for efficient querying
expenseSchema.index({ category: 1, date: -1 });
expenseSchema.index({ date: -1 });

// Static method to get distinct categories
expenseSchema.statics.getDistinctCategories = function() {
  return this.distinct('category');
};

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;