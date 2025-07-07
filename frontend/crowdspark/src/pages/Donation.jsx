import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { campaignId } = useParams();

  const handleProceed = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }

    setError('');
    navigate(`/Payment/${campaignId}`, {
      state: { amount: parseInt(amount, 10) },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(to right, #004e64, #00a6a6)' }}
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Make a Donation
        </h2>

        <label className="block text-sm text-gray-700 mb-2">
          Enter Donation Amount (₹)
        </label>
        <input
          type="number"
          placeholder="e.g., 500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleProceed}
          className="w-full bg-[#007c91] text-white font-medium py-2 rounded hover:bg-[#005f6b] transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Donation;
