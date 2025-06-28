import React, { useState } from 'react';

const BankDetails = () => {
  const [bank, setBank] = useState({
    accountName: '',
    accountNumber: '',
    ifsc: '',
    bankName: '',
    branch: '',
    upi: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBank({ ...bank, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { accountName, accountNumber, ifsc, bankName, branch, upi } = bank;

    if (!accountName || !accountNumber || !ifsc || !bankName || !branch || !upi) {
      alert('Please complete all fields');
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="p-12 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">Enter Bank Details</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Account Holder Name *</label>
            <input
              type="text"
              name="accountName"
              value={bank.accountName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Account Number *</label>
            <input
              type="text"
              name="accountNumber"
              value={bank.accountNumber}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">IFSC Code *</label>
            <input
              type="text"
              name="ifsc"
              value={bank.ifsc}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Bank Name *</label>
            <input
              type="text"
              name="bankName"
              value={bank.bankName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Bank Branch *</label>
            <input
              type="text"
              name="branch"
              value={bank.branch}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">UPI ID *</label>
            <input
              type="text"
              name="upi"
              value={bank.upi}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-teal-700 text-white font-semibold px-6 py-2 rounded hover:bg-teal-800 transition"
          >
            Launch My Campaign
          </button>
        </form>
      ) : (
        <div className="text-center bg-green-100 p-6 rounded">
          <h2 className="text-2xl font-bold text-teal-700 mb-2">Campaign Launched!</h2>
          <p>Your campaign and bank details have been submitted successfully.</p>
        </div>
      )}
    </div>
  );
};

export default BankDetails;
