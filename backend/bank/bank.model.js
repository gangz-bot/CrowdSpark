const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  beneficiaryName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  confirmAccountNumber: { type: String, required: true },
  bankName: { type: String, required: true },
  branchName: { type: String, required: true },
  ifscCode: { type: String, required: true },
  upiId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('BankDetail', bankSchema);
