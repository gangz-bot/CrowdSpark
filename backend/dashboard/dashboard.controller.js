const Payment = require('../payment/Payment');
const Campaign = require('../campaign/campaign.model');
const mongoose = require('mongoose');

exports.getCampaignStats = async (req, res) => {
  const { id: campaignId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(campaignId)) {
    return res.status(400).json({ message: 'Invalid campaign ID' });
  }

  try {
    // Total donations
    const payments = await Payment.find({ campaignId });
    const totalDonations = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

    // Withdrawable = totalDonations - 2%
    const withdrawable = totalDonations - totalDonations * 0.02;

    // Views (from campaign)
    const campaign = await Campaign.findById(campaignId);
    const views = campaign?.views || 0;

    // Days left
    let daysLeft = 0;
    if (campaign) {
      const createdAt = campaign.createdAt || campaign._id.getTimestamp();
      const endDate = new Date(createdAt);
      endDate.setDate(endDate.getDate() + campaign.duration);
      const diff = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));
      daysLeft = diff > 0 ? diff : 0;
    }

    return res.json({
      totalDonations,
      withdrawable: Math.floor(withdrawable),
      views,
      daysLeft
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getRecentDonations = async (req, res) => {
  const { campaignId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(campaignId)) {
    return res.status(400).json({ message: 'Invalid campaign ID' });
  }

  try {
    const recentDonations = await Payment.find({ campaignId })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.json({ recentDonations });
  } catch (error) {
    console.error('Error fetching recent donations:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
