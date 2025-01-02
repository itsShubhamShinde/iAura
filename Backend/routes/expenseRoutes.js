const express = require('express');
const { addExpense, getExpenses } = require('../controller/expenseController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-expense', authenticate, addExpense);
router.get('/expenses', authenticate, getExpenses);

module.exports = router;
