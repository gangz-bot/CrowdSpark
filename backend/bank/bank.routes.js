const express = require('express');
const router = express.Router();
const auth = require('../auth/auth.middleware');
const { saveBankDetails } = require('./bank.controller');

router.post('/add', auth, saveBankDetails);

module.exports = router;
