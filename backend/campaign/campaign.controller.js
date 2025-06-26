const fs = require('fs');
const Campaign = require('./campaign.model');

exports.createCampaign = async (req, res) => {
  const { title, description, category, story, fundingGoal, duration } = req.body;

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
      media: {
        data: base64Data,
        contentType: req.file.mimetype
      }
    });

    await campaign.save();
    res.status(201).json({ message: 'Campaign created', campaign });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
