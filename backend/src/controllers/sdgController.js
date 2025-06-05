const SDG = require('../models/SDG');
const Progress = require('../models/Progress');
const User = require('../models/User');

const getAllSDGs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    const sdgs = await SDG.find().sort({ id: 1 });
    
    const sdgList = await Promise.all(
      sdgs.map(async (sdg) => {
        const progress = await Progress.find({ userId, sdgId: sdg.id });
        const completedModules = progress.filter(p => p.completed).length;
        const totalModules = sdg.totalModules;
        
        return {
          id: sdg.id,
          name: sdg.name,
          description: sdg.description,
          icon: sdg.icon,
          totalModules,
          completedModules,
          progress: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
          isCompleted: user.completedSDGs.includes(sdg.id)
        };
      })
    );

    res.json({
      completed: user.completedSDGs.length,
      sdgs: sdgList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const startSDG = async (req, res) => {
  try {
    const { sdgId } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const sdg = await SDG.findOne({ id: sdgId });
    if (!sdg) {
      return res.status(404).json({ message: 'SDG not found' });
    }

    // Update user's current SDG
    user.currentSDG = sdgId;
    await user.save();

    res.json({
      message: 'SDG started successfully',
      sdg: {
        id: sdg.id,
        name: sdg.name,
        description: sdg.description
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const getSDGProgress = async (req, res) => {
  try {
    const { sdgId } = req.params;
    const userId = req.user.userId;

    const sdg = await SDG.findOne({ id: sdgId }).populate('modules');
    if (!sdg) {
      return res.status(404).json({ message: 'SDG not found' });
    }

    const progress = await Progress.find({ userId, sdgId: parseInt(sdgId) });
    const completedModules = progress.filter(p => p.completed).length;
    const totalModules = sdg.totalModules;

    const modules = await Promise.all(
      sdg.modules.map(async (module) => {
        const moduleProgress = progress.find(p => p.moduleId.toString() === module._id.toString());
        return {
          id: module._id,
          title: module.title,
          description: module.description,
          duration: module.duration,
          completed: moduleProgress ? moduleProgress.completed : false,
          progress: moduleProgress ? moduleProgress.progress : 0
        };
      })
    );

    res.json({
      progress: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
      modules
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = { getAllSDGs, startSDG, getSDGProgress };