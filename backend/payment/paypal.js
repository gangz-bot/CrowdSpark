// backend/payment/paypal.js
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // or 'live'
  client_id: "AZFM-XOcN3RbANDRGn-3jXmBGWfWMXQBOg-n13d1NRJa7bSXa64SC3yLDfbQbhyp7VxfgbUD3iyWV0Vt",
  client_secret: "EBxFC5KCePi95YDKUJaMxJWE5-Vt_kJlWQoM6Q52VohDN8zsVC2MFx-iUz7EUGqm3XesmJU3VW1NRc-D",
});

module.exports = paypal;
