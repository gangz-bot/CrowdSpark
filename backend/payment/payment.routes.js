// const express = require('express');
// const Razorpay = require('razorpay');
// const router = express.Router();

// // Create Razorpay instance
// const razorpay = new Razorpay({
//   key_id: 'rzp_test_Mbvopa7rxyHd1W',
//   key_secret: 's8udS63IlU965opPeYeYRov5',
// });

// // POST /api/payment/create-order
// router.post('/create-order', async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount) {
//       return res.status(400).json({ error: 'Amount is required' });
//     }

//     const options = {
//       amount: amount, // amount in paise (₹500 = 50000)
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     return res.status(200).json(order);
//   } catch (error) {
//     console.error('Error in create-order:', error);
//     return res.status(500).json({ error: 'Order creation failed' });
//   }
// });

// module.exports = router;
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('./Payment'); // make sure this path is correct
const router = express.Router();

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_Mbvopa7rxyHd1W',
  key_secret: 's8udS63IlU965opPeYeYRov5',
});

// POST /api/payment/create-order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, campaignId } = req.body;

    if (!amount || !campaignId) {
      return res.status(400).json({ error: 'Amount and campaignId are required' });
    }

    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    order.campaignId = campaignId; // add campaignId to response
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error in create-order:', error);
    return res.status(500).json({ error: 'Order creation failed' });
  }
});

// POST /api/payment/verify
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      campaignId,
      amount,
    } = req.body;

    // const sign = razorpay_order_id + "|" + razorpay_payment_id;
    // const expectedSign = crypto
    //   .createHmac('sha256', razorpay.key_secret)
    //   .update(sign)
    //   .digest('hex');

    // if (expectedSign !== razorpay_signature) {
    //   return res.status(400).json({ success: false, message: 'Invalid signature' });
    // }

    // Save payment to MongoDB
    await Payment.create({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      campaignId,
      amount,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in verify:', error);
    return res.status(500).json({ success: false, message: 'Verification failed' });
  }
});

module.exports = router;
