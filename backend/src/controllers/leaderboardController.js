const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

const getLeaderboard = async (req, res) => {
  try {
    const { range = 'alltime', limit = 10 } = req.query;

    const leaderboard = await Leaderboard.find({ period: range })
      .populate('userId', 'name')
      .sort({ points: -1 })
      .limit(parseInt(limit));

    const users = leaderboard.map((entry, index) => ({
      rank: index + 1,
      name: entry.userId.name,
      points: entry.points
    }));

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const getUserRank = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { range = 'alltime' } = req.query;

    const userEntry = await Leaderboard.findOne({ userId, period: range });
    if (!userEntry) {
      return res.status(404).json({ message: 'User not found in leaderboard' });
    }

    const totalUsers = await Leaderboard.countDocuments({ period: range });
    const percentile = Math.round(((totalUsers - userEntry.rank) / totalUsers) * 100);

    res.json({
      rank: userEntry.rank,
      points: userEntry.points,
      percentile
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = { getLeaderboard, getUserRank };