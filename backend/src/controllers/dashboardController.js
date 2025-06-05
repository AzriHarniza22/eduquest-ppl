const User = require('../models/User');
const Badge = require('../models/Badge');
const SDG = require('../models/SDG');
const Progress = require('../models/Progress');
const Challenge = require('../models/Challenge');
const Leaderboard = require('../models/Leaderboard');

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user data
    const user = await User.findById(userId).populate('badges');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user rank
    const userRank = await Leaderboard.findOne({ userId }).sort({ points: -1 });

    // Get SDGs progress
    const sdgs = await SDG.find();
    const sdgProgress = await Promise.all(
      sdgs.map(async (sdg) => {
        const progress = await Progress.find({ userId, sdgId: sdg.id });
        const completedModules = progress.filter(p => p.completed).length;
        const totalModules = sdg.totalModules;
        return {
          id: sdg.id,
          name: sdg.name,
          progress: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
          completed: completedModules === totalModules
        };
      })
    );

    // Get current progress
    const currentProgress = await Progress.findOne({ 
      userId, 
      completed: false 
    }).populate('moduleId');

    // Get daily challenge
    const dailyChallenge = await Challenge.findOne({ 
      type: 'daily', 
      isActive: true 
    });

    // Get leaderboard (top 5)
    const leaderboard = await Leaderboard.find({ period: 'alltime' })
      .populate('userId', 'name')
      .sort({ points: -1 })
      .limit(5);

    // Get recent badges (last 3)
    const recentBadges = user.badges.slice(-3);

    res.json({
      name: user.name,
      points: user.points,
      badges: user.badges.length,
      rank: userRank ? userRank.rank : null,
      sdgs: sdgProgress,
      currentProgress: currentProgress ? {
        moduleTitle: currentProgress.moduleId.title,
        progress: currentProgress.progress
      } : null,
      dailyChallenge: dailyChallenge ? {
        id: dailyChallenge._id,
        title: dailyChallenge.title,
        points: dailyChallenge.points
      } : null,
      leaderboard: leaderboard.map(entry => ({
        name: entry.userId.name,
        points: entry.points
      })),
      recentBadges
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = { getDashboard };