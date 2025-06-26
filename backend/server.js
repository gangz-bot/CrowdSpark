const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dotenv = require('dotenv');
const connectDB = require('./config/db');

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
