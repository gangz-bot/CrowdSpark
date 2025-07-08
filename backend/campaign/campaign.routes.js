// const express = require('express');
// const router = express.Router();
// const auth = require('../auth/auth.middleware');
// const multer = require('multer');
// const { createCampaign } = require('./campaign.controller');
// const Campaign = require('./campaign.model');

// // Set up Multer for image/video upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });

// // Allow image and video mimetypes
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/mkv'];
//   if (allowedTypes.includes(file.mimetype)) cb(null, true);
//   else cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
// };

// const upload = multer({ storage, fileFilter });

// // Route to create campaign with media
// router.post('/create', auth, upload.single('media'), createCampaign);
// router.get('/', async (req, res) => {

//     // const sort = req.query.sort;
//     const { sort, search } = req.query;
//   let sortQuery = {};

//   if (sort === 'newest') {
//     sortQuery = { createdAt: -1 };
//   } else if (sort === 'ending-soon') {
//     sortQuery = { duration: 1 }; // ✅ use duration for now
//   } else if (sort === 'most-funded') {
//     sortQuery = { fundingGoal: -1 };
//   } else {
//     sortQuery = { createdAt: -1 }; // default
//   }

//   let searchFilter = {};
// if (search) {
//   searchFilter.title = { $regex: search, $options: 'i' };
// }

//   try {
//     // const campaigns = await Campaign.find().sort({ createdAt: -1 });
//     const campaigns = await Campaign.find(searchFilter).sort(sortQuery);


//     res.status(200).json({ campaigns });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });

    
//   }
// });

// router.get('/user', async (req, res) => {
//   const { userId } = req.query;
//   if (!userId) {
//     return res.status(400).json({ message: "Missing userId" });
//   }
//   try {
//     const campaigns = await Campaign.find({ userId });
//     res.status(200).json({ campaigns });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// router.get('/:id', async (req, res) => {
//   try {
//     const campaign = await Campaign.findById(req.params.id).populate('userId', 'email');
//     if (!campaign) {
//       return res.status(404).json({ message: 'Campaign not found' });
//     }
//     res.json(campaign);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });




// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../auth/auth.middleware');
const multer = require('multer');
const Campaign = require('./campaign.model');

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
    'image/jpeg',
    'image/png',
    'image/jpg',
    'video/mp4',
    'video/mkv',
  ];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
};

const upload = multer({ storage, fileFilter });

// ✅ Route: Create campaign with media
const { createCampaign } = require('./campaign.controller');
router.post('/create', auth, upload.single('media'), createCampaign);

// ✅ Route: Get campaigns with sort and search
router.get('/', async (req, res) => {
  const { sort, search } = req.query;
  let sortQuery = {};

  if (sort === 'newest') {
    sortQuery = { createdAt: -1 };
  } else if (sort === 'ending-soon') {
    sortQuery = { duration: 1 };
  } else if (sort === 'most-funded') {
    sortQuery = { fundingGoal: -1 };
  } else {
    sortQuery = { createdAt: -1 };
  }

  let searchFilter = {};
  if (search) {
    searchFilter.title = { $regex: search, $options: 'i' };
  }

  try {
    const campaigns = await Campaign.find(searchFilter).sort(sortQuery);
    res.status(200).json({ campaigns });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Route: Get campaigns by user
router.get('/user', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'Missing userId' });
  }
  try {
    const campaigns = await Campaign.find({ userId });
    res.status(200).json({ campaigns });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Route: Get single campaign by ID
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

router.post('/generate-story', auth, async (req, res) => {
  try {
    const { title, description, category } = req.body;


    if (!title || !description || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `Write a persuasive campaign story (max 250 words) about a ${category} project titled "${title}". Description: ${description}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [{ role: "system", content: "You are a helpful assistant creating compelling crowdfunding campaign stories." },
                 { role: "user", content: prompt }],
    });

    const generatedText = completion.choices[0].message.content.trim();

    res.json({ story: generatedText });

  } catch (error) {
    console.error("Error generating story:", error);
    res.status(500).json({ message: "Error generating story", error: error.message });
  }
});

module.exports = router;