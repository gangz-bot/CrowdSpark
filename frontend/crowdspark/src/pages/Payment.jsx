// import React, { useEffect } from 'react';

// const Payment = () => {
//   const payNow = async () => {
//     const response = await fetch('http://localhost:5000/api/payment/create-order', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: 50000 }) // ₹500
//     });

//     const order = await response.json();

//     const options = {
//       key:"rzp_test_Mbvopa7rxyHd1W",  
//       amount: order.amount,
//       currency: order.currency,
//       name: 'My App',
//       description: 'Test Payment',
//       order_id: order.id,
//       callback_url: 'http://localhost:5000/payment-success',
//       theme: {
//         color: '#3399cc',
//       },
//     };

//     const razor = new window.Razorpay(options);
//     razor.open();
//   };

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <div className="text-center mt-20">
//       <button onClick={payNow} className="bg-blue-600 text-white px-6 py-3 rounded">
//         Pay Now
//       </button>
//     </div>
//   );
// };

// export default Payment;
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Payment = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount || 500; // fallback amount

  const payNow = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount * 100, // convert to paise
          campaignId,
        }),
      });

      const order = await res.json();

      const options = {
        key: 'rzp_test_Mbvopa7rxyHd1W',
        amount: order.amount,
        currency: 'INR',
        name: 'My App',
        description: 'Donation',
        order_id: order.id,
        handler: function (response) {
          // 🚀 Skip verify for now and directly go home
          navigate('/', { replace: true });
        },
        theme: { color: '#3399cc' },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error('Payment Error:', err);
      alert('Failed to start payment. Please try again.');
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-semibold mb-6">Proceed with Payment</h2>
      <button
        onClick={payNow}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Pay Now ₹{amount}
      </button>
    </div>
  );
};

export default Payment;


