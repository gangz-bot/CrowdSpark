const paypal = require('./paypal');

// Step 1: Create the payment and send approval link to frontend
exports.createPayment = (req, res) => {
  const { amount } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: `http://localhost:5000/success?amount=${amount}`,
      cancel_url: "http://localhost:5000/failed",
    },
    transactions: [{
      item_list: {
        items: [{
          name: "Donation",
          sku: "donation",
          price: amount,
          currency: "USD", // Make sure your sandbox business account accepts USD
          quantity: 1,
        }],
      },
      amount: {
        currency: "USD",
        total: amount,
      },
      description: "Donation payment",
    }],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }

    const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
    return res.json({ approval_url: approvalUrl.href });
  });
};

// Step 2: PayPal redirects here → backend executes payment
exports.executePayment = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const amount = req.query.amount;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [{
      amount: {
        currency: "USD",
        total: amount,
      },
    }],
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.error("Payment execution error:", error.response);
      return res.redirect("http://localhost:5173/failed");
    }

    return res.redirect("http://localhost:5173/success");
  });
};

// Step 3: Cancel handler
exports.cancelPayment = (req, res) => {
  return res.redirect("http://localhost:5173/failed");
};
