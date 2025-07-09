const express = require('express');
const router = express.Router();
const auth = require('../auth/auth.middleware');
const multer = require('multer');
const Campaign = require('./campaign.model');
const Payment = require('../payment/Payment'); // ✅ import Payment
const mongoose = require('mongoose'); // ✅ import mongoose

// ✅ Load .env variables
require('dotenv').config();

// ✅ Initialize OpenAI
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Set up Multer for image/video upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/mkv'
  ];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
};
const upload = multer({ storage, fileFilter });

// ✅ Route: Create campaign
const { createCampaign } = require('./campaign.controller');
router.post('/create', auth, upload.single('media'), createCampaign);

// ✅ Route: Get all campaigns (with sort, search & mediaUrl)
router.get('/', async (req, res) => {
  const { sort, search } = req.query;
  let sortQuery = {};
  if (sort === 'newest') sortQuery = { createdAt: -1 };
  else if (sort === 'ending-soon') sortQuery = { duration: 1 };
  else if (sort === 'most-funded') sortQuery = { fundingGoal: -1 };
  else sortQuery = { createdAt: -1 };

  let searchFilter = {};
  if (search) {
    searchFilter.title = { $regex: search, $options: 'i' };
  }

  try {
    const campaigns = await Campaign.find(searchFilter).sort(sortQuery);
    const campaignsWithMediaUrl = campaigns.map(c => ({
      ...c.toObject(),
      mediaUrl: c.media?.data
        ? `data:${c.media.contentType};base64,${c.media.data}`
        : null,
    }));
    res.status(200).json({ campaigns: campaignsWithMediaUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Route: Get campaigns by user
router.get('/user', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "Missing userId" });
  try {
    const campaigns = await Campaign.find({ userId });
    const campaignsWithMediaUrl = campaigns.map(c => ({
      ...c.toObject(),
      mediaUrl: c.media?.data
        ? `data:${c.media.contentType};base64,${c.media.data}`
        : null,
    }));
    res.status(200).json({ campaigns: campaignsWithMediaUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Route: Get single campaign by ID (with mediaUrl)
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('userId', 'email');
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    const campaignWithMediaUrl = {
      ...campaign.toObject(),
      mediaUrl: campaign.media?.data
        ? `data:${campaign.media.contentType};base64,${campaign.media.data}`
        : null,
    };
    res.json(campaignWithMediaUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Route: Delete campaign (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!deletedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Route: Increment view
router.post('/:id/view', async (req, res) => {
  try {
    const campaignId = req.params.id;
    await Campaign.findByIdAndUpdate(campaignId, { $inc: { views: 1 } });
    res.status(200).json({ message: 'View counted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to count view' });
  }
});

// ✅ Route: Get stats for a specific campaign
router.get('/:id/stats', async (req, res) => {
  try {
    const campaignId = req.params.id;

    // Total donations
    const totalDonationsResult = await Payment.aggregate([
      { $match: { campaignId: new mongoose.Types.ObjectId(campaignId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalDonations = totalDonationsResult[0]?.total || 0;

    const withdrawable = Math.floor(totalDonations * 0.98); // deduct 2% fee

    const campaign = await Campaign.findById(campaignId).lean();

    // Days left calculation
    let daysLeft = 0;
    if (campaign) {
      const createdAt = new Date(campaign.createdAt);
      const now = new Date();
      const endDate = new Date(createdAt);
      endDate.setDate(endDate.getDate() + parseInt(campaign.duration || 0));
      const diffTime = endDate - now;
      daysLeft = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
    }

    res.json({
      totalDonations,
      views: campaign?.views || 0,
      daysLeft,
      withdrawable
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// ✅ Route: Get donations over time for a campaign
router.get('/:id/donations-over-time', async (req, res) => {
  try {
    const campaignId = req.params.id;
    const donations = await Payment.aggregate([
      { $match: { campaignId: new mongoose.Types.ObjectId(campaignId) } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formatted = donations.map(item => ({
      date: item._id,
      total: item.total
    }));

    res.json({ donationsOverTime: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch donations over time" });
  }
});

// ✅ Route: Generate campaign story with OpenAI
router.post('/generate-story', auth, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const prompt = `Write a persuasive crowdfunding campaign story (max 250 words) about a ${category} project titled "${title}". Description: ${description}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: "You are a helpful assistant creating compelling crowdfunding campaign stories." },
        { role: "user", content: prompt },
      ],
    });

    const generatedText = completion.choices[0].message.content.trim();

    res.json({ story: generatedText });
  } catch (error) {
    console.error("Error generating story:", error);
    res.status(500).json({ message: 'Error generating story', error: error.message });
  }
});

module.exports = router;
