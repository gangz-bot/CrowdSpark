import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BankDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    beneficiaryName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
    upiId: '',
  });

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Check if bank details already exist
  useEffect(() => {
    const checkBankDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('https://crowdspark-backend.onrender.com/api/bank/check', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.exists) {
          // Already exists, redirect
          navigate('/campaigns');
        }
      } catch (err) {
        console.error('Error checking bank details:', err);
      }
    };

    checkBankDetails();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in');
      return;
    }

    if (formData.accountNumber !== formData.confirmAccountNumber) {
      setError('Account numbers do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/bank/add', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setError('');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleFinalLaunch = () => {
    navigate('/campaigns');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Bank Details</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label className="block font-medium">Beneficiary Name *</label>
            <input
              type="text"
              name="beneficiaryName"
              value={formData.beneficiaryName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Account Number *</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Confirm Account Number *</label>
            <input
              type="text"
              name="confirmAccountNumber"
              value={formData.confirmAccountNumber}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Bank Name *</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Branch Name *</label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">IFSC Code *</label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">UPI ID</label>
            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-teal-700 text-white font-semibold px-6 py-2 rounded hover:bg-teal-800 transition"
          >
            Submit Bank Details
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-green-600 font-semibold mb-6">
            Bank details submitted successfully!
          </p>
          <button
            onClick={handleFinalLaunch}
            className="bg-teal-700 text-white font-semibold px-6 py-2 rounded hover:bg-teal-800 transition"
          >
            View My Campaign
          </button>
        </div>
      )}
    </div>
  );
};

export default BankDetails;
