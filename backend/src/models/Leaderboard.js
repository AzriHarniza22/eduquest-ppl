const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  points: {
    type: Number,
    required: true,
    default: 0
  },
  rank: {
    type: Number,
    required: true,
    default: 0
  },
  period: {
    type: String,
    enum: ['weekly', 'monthly', 'alltime'],
    default: 'alltime'
  },
  week: {
    type: Number,
    default: null
  },
  month: {
    type: Number,
    default: null
  },
  year: {
    type: Number,
    default: null
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
leaderboardSchema.index({ period: 1, points: -1 });
leaderboardSchema.index({ userId: 1, period: 1 }, { unique: true });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);