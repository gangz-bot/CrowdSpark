const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  amount: Number,
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  }
}, { timestamps: true }); // ✅ this automatically adds createdAt and updatedAt

module.exports = mongoose.model('Payment', paymentSchema);
