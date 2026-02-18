const express = require('express');
const router = express.Router();
const {
  createExpense,
  getExpenses,
  getSummary
} = require('../controllers/expenseController');
const validateExpense = require('../middleware/validateExpense');
const idempotencyMiddleware = require('../middleware/idempotency');

// Apply idempotency middleware to POST requests
router.post('/', idempotencyMiddleware, validateExpense, createExpense);

// GET routes
router.get('/', getExpenses);
router.get('/summary', getSummary); // Nice-to-have feature

module.exports = router;