import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginSignup.css';

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

        const res = await axios.get('http://localhost:5000/api/bank/check', {

          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.exists) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#004e64] to-[#00a6a6] py-10 px-4">
      <div className="container bg-white rounded-[50px] px-8 py-10 w-full max-w-2xl">
        <div className="header">
          <div className="text">Bank Details</div>
          <div className="underline"></div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 mt-10">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div>
              <label className="block text-center font-medium mb-2">Beneficiary Name *</label>
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
              <label className="block text-center font-medium mb-2">Account Number *</label>
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
              <label className="block text-center font-medium mb-2">Confirm Account Number *</label>
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
              <label className="block text-center font-medium mb-2">Bank Name *</label>
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
              <label className="block text-center font-medium mb-2">Branch Name *</label>
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
              <label className="block text-center font-medium mb-2">IFSC Code *</label>
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
              <label className="block text-center font-medium mb-2">UPI ID</label>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="submit-container">
              <button type="submit" className="submit">
                Submit Bank Details
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center mt-10">
            <p className="text-green-600 font-semibold mb-6">
              Bank details submitted successfully!
            </p>
            <button onClick={handleFinalLaunch} className="submit">
              View My Campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankDetails;
