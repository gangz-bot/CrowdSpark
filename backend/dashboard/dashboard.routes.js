const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboard.controller');

router.get('/campaigns/:id/stats', dashboardController.getCampaignStats);
router.get('/payments/recent/:campaignId', dashboardController.getRecentDonations);

module.exports = router;
