const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const chatRoutes = require("./chat/chat.routes");
const dashboardRoutes = require('./dashboard/dashboard.routes');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use('/api/auth', require('./auth/auth.routes'));

// for campaign details save
app.use('/api/campaigns', require('./campaign/campaign.routes'));

// to save bank details per user 
app.use('/api/bank', require('./bank/bank.routes'));

//for payment
app.use('/api/payment', require('./payment/payment.routes'));

app.use("/api/chat", chatRoutes);

app.use('/api', dashboardRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
