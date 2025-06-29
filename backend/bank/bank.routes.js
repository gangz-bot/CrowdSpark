const express = require('express');
const router = express.Router();
const auth = require('../auth/auth.middleware');
const { saveBankDetails } = require('./bank.controller');
const Bank = require('./bank.model');

// Route to save bank details
router.post('/add', auth, saveBankDetails);

//New route to check if user already submitted bank details
router.get('/check', auth, async (req, res) => {
  try {
    const existing = await Bank.findOne({ userId: req.user.id });
    res.json({ exists: !!existing }); // true or false
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
