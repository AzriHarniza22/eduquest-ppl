const Badge = require('../models/Badge');
const User = require('../models/User');

const getAllBadges = async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = {};
    if (category) query.category = category;

    const badges = await Badge.find(query);
    res.json(badges);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const getUserBadges = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate('badges');
    const allBadges = await Badge.find();

    const earned = user.badges;
    const available = allBadges.filter(badge => 
      !user.badges.some(userBadge => userBadge._id.toString() === badge._id.toString())
    );

    res.json({
      earned,
      available
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const checkBadgeProgress = async (req, res) => {
  try {
    const { badgeId } = req.params;
    const userId = req.user.userId;

    const badge = await Badge.findById(badgeId);
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }

    const user = await User.findById(userId);
    
    // Simple progress calculation based on badge requirements
    let progress = 0;
    if (badge.requirements.type === 'points_earned') {
      progress = Math.min(100, (user.points / badge.requirements.target) * 100);
    } else if (badge.requirements.type === 'streak_days') {
      progress = Math.min(100, (user.streak / badge.requirements.target) * 100);
    }

    res.json({
      progress: Math.round(progress),
      requirements: badge.requirements
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = { getAllBadges, getUserBadges, checkBadgeProgress };