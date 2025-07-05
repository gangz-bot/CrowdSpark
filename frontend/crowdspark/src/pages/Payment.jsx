import React, { useEffect } from 'react';

const Payment = () => {
  const payNow = async () => {
    const response = await fetch('http://localhost:5000/api/payment/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 50000 }) // ₹500
    });

    const order = await response.json();

    const options = {
      key:"rzp_test_Mbvopa7rxyHd1W",  
      amount: order.amount,
      currency: order.currency,
      name: 'My App',
      description: 'Test Payment',
      order_id: order.id,
      callback_url: 'http://localhost:5000/payment-success',
      theme: {
        color: '#3399cc',
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="text-center mt-20">
      <button onClick={payNow} className="bg-blue-600 text-white px-6 py-3 rounded">
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
