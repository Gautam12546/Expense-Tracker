const Expense = require('../models/Expense');

// @desc    Create a new expense
// @route   POST /api/expenses
// @access  Public
const createExpense = async (req, res, next) => {
  try {
    const { amount, category, description, date } = req.body;

    // Create expense with optional requestId for idempotency
    const expenseData = {
      amount,
      category,
      description,
      date: new Date(date)
    };

    // Add requestId if available from middleware
    if (req.idempotencyKey) {
      expenseData.requestId = req.idempotencyKey;
    }

    const expense = await Expense.create(expenseData);

    res.status(201).json({
      success: true,
      data: expense
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all expenses with filtering and sorting
// @route   GET /api/expenses
// @access  Public
const getExpenses = async (req, res, next) => {
  try {
    const { category, sort } = req.query;
    
    // Build filter object
    const filter = {};
    if (category) {
      filter.category = category;
    }

    // Build sort object
    let sortOption = { date: -1 }; // Default: newest first
    if (sort === 'date_desc') {
      sortOption = { date: -1 };
    } else if (sort === 'date_asc') {
      sortOption = { date: 1 };
    }

    // Execute query
    const expenses = await Expense.find(filter)
      .sort(sortOption)
      .lean(); // Convert to plain JavaScript objects

    // Get unique categories for filter dropdown
    const categories = await Expense.getDistinctCategories();

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
      filters: {
        categories: categories.sort()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get expense summary (Nice-to-have)
// @route   GET /api/expenses/summary
// @access  Public
const getSummary = async (req, res, next) => {
  try {
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          average: { $avg: '$amount' }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    const totalOverall = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        byCategory: summary,
        overall: totalOverall[0] || { total: 0, count: 0 }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getSummary
};