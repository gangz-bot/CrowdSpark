const express = require('express');
const router = express.Router();
const auth = require('../auth/auth.middleware');
const multer = require('multer');
const { createCampaign } = require('./campaign.controller');
const Campaign = require('./campaign.model');

// Set up Multer for image/video upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

// Allow image and video mimetypes
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/mkv'];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
};

const upload = multer({ storage, fileFilter });

// Route to create campaign with media
router.post('/create', auth, upload.single('media'), createCampaign);
router.get('/', async (req, res) => {

    // const sort = req.query.sort;
    const { sort, search } = req.query;
  let sortQuery = {};

  if (sort === 'newest') {
    sortQuery = { createdAt: -1 };
  } else if (sort === 'ending-soon') {
    sortQuery = { duration: 1 }; // ✅ use duration for now
  } else if (sort === 'most-funded') {
    sortQuery = { fundingGoal: -1 };
  } else {
    sortQuery = { createdAt: -1 }; // default
  }

  let searchFilter = {};
if (search) {
  searchFilter.title = { $regex: search, $options: 'i' };
}

  try {
    // const campaigns = await Campaign.find().sort({ createdAt: -1 });
    const campaigns = await Campaign.find(searchFilter).sort(sortQuery);


    res.status(200).json({ campaigns });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });

    
  }
});

router.get('/user', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }
  try {
    const campaigns = await Campaign.find({ userId });
    res.status(200).json({ campaigns });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('userId', 'email');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
