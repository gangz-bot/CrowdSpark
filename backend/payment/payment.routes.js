const express = require('express');
const router = express.Router();
const paymentController = require('./payment.controller');

router.post('/create-payment', paymentController.createPayment);
router.get('/success', paymentController.executePayment);
router.get('/failed', paymentController.cancelPayment);

module.exports = router;
