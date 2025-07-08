const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  description: String,
  category: String,
  media: {
    data: String, // base64 string
    contentType: String // e.g. "image/png", "video/mp4"
  },
  story: String,
  fundingGoal: Number,
  duration: Number,
  views: { type: Number, default: 0 } 
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
