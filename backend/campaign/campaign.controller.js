const fs = require('fs');
const Campaign = require('./campaign.model');

exports.createCampaign = async (req, res) => {
  const { title, description, category, story, fundingGoal, duration } = req.body;

  if (!title || !description || !category || !story || !fundingGoal || !duration || !req.file) {
    return res.status(400).json({ message: 'All fields including media are required.' });
  }

  if (parseInt(fundingGoal) <= 0) {
    return res.status(400).json({ message: 'Funding goal must be a positive number.' });
  }

  if (parseInt(duration) <= 0) {
    return res.status(400).json({ message: 'Duration must be a positive number.' });
  }

  try {
    const fileData = fs.readFileSync(req.file.path);
    const base64Data = fileData.toString('base64');

    const campaign = new Campaign({
      userId: req.user.id,
      title,
      description,
      category,
      story,
      fundingGoal,
      duration,
      // views,
      media: {
        data: base64Data,
        contentType: req.file.mimetype,
      },
    });

    await campaign.save();
    res.status(201).json({ message: 'Campaign created', campaign });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
