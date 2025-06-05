const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Badge title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Badge description is required']
  },
  category: {
    type: String,
    required: [true, 'Badge category is required'],
    enum: ['Learning', 'Quiz', 'Streak', 'Daily']
  },
  icon: {
    type: String,
    required: [true, 'Badge icon is required']
  },
  points: {
    type: Number,
    required: [true, 'Badge points is required'],
    min: 1
  },
  requirements: {
    type: {
      type: String,
      required: true,
      enum: ['modules_completed', 'points_earned', 'streak_days', 'challenges_completed']
    },
    target: {
      type: Number,
      required: true,
      min: 1
    }
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Badge', badgeSchema);