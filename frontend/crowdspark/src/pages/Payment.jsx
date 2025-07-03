import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const amount = location.state?.amount;

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!amount) {
      alert('No donation amount found. Please go back and enter an amount.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/create-payment', { amount });
      if (res.data.approval_url) {
        window.location.href = res.data.approval_url;
      } else {
        alert('Approval URL not received');
        console.error('Approval URL not found.');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  return (
    <div className="p-10 text-xl text-center">
      <h1 className="mb-6 text-3xl font-bold">Payment Page</h1>
      <p className="mb-4">Donation Amount: <strong>${amount}</strong></p>
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Payment;
