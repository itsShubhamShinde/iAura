const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const { category, amount, comments } = req.body;
    const expense = new Expense({ user: req.user.id, category, amount, comments });
    await expense.save();
    res.status(201).json({ message: 'Expense added', expense });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add expense', details: err });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ expenses });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve expenses', details: err });
  }
};
