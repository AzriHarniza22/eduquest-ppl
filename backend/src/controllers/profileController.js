const User = require('../models/User');
const Progress = require('../models/Progress');
const Badge = require('../models/Badge');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate('badges');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalProgress = await Progress.find({ userId });
    const completedModules = totalProgress.filter(p => p.completed).length;
    const totalTimeSpent = totalProgress.reduce((sum, p) => sum + p.timeSpent, 0);

    res.json({
      stats: {
        totalPoints: user.points,
        dayStreak: user.streak,
        hoursLearned: Math.round(totalTimeSpent / 60),
        completedModules,
        totalBadges: user.badges.length
      },
      activity: {
        lastLogin: user.lastLogin,
        joinDate: user.createdAt,
        completedSDGs: user.completedSDGs.length
      },
      badges: user.badges,
      achievements: {
        points: user.points,
        streak: user.streak,
        modules: completedModules
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, email } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        points: user.points
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const getProfileStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    const progress = await Progress.find({ userId });
    
    const completedModules = progress.filter(p => p.completed).length;
    const totalQuizzes = progress.length;
    const totalTimeSpent = progress.reduce((sum, p) => sum + p.timeSpent, 0);
    const avgScore = totalQuizzes > 0 ? Math.round(progress.reduce((sum, p) => sum + p.progress, 0) / totalQuizzes) : 0;

    res.json({
      totalPoints: user.points,
      dayStreak: user.streak,
      hoursLearned: Math.round(totalTimeSpent / 60),
      modules: completedModules,
      quizzes: totalQuizzes,
      avgScore
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = { getProfile, updateProfile, getProfileStats };