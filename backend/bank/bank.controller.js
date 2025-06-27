const BankDetail = require('./bank.model');

const saveBankDetails = async (req, res) => {
  const userId = req.user.id;
  const { beneficiaryName, accountNumber, confirmAccountNumber, bankName, branchName, ifscCode, upiId } = req.body;

  if (accountNumber !== confirmAccountNumber) {
    return res.status(400).json({ message: "Account numbers do not match." });
  }

  try {
    const existing = await BankDetail.findOne({ userId });
    if (existing) return res.status(400).json({ message: "Bank details already submitted." });

    const bank = new BankDetail({
      userId,
      beneficiaryName,
      accountNumber,
      confirmAccountNumber,
      bankName,
      branchName,
      ifscCode,
      upiId,
    });

    await bank.save();
    res.status(201).json({ message: "Bank details saved", bank });
  } catch (err) {
    res.status(500).json({ message: "Error saving bank details", error: err.message });
  }
};

module.exports = { saveBankDetails };
