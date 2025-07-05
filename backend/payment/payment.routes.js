const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_Mbvopa7rxyHd1W',
  key_secret: 's8udS63IlU965opPeYeYRov5',
});

// POST /api/payment/create-order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const options = {
      amount: amount, // amount in paise (₹500 = 50000)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error in create-order:', error);
    return res.status(500).json({ error: 'Order creation failed' });
  }
});

module.exports = router;
