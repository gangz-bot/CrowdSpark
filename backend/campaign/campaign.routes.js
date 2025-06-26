const express = require('express');
const router = express.Router();
const auth = require('../auth/auth.middleware');
const multer = require('multer');
const { createCampaign } = require('./campaign.controller');

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

module.exports = router;
