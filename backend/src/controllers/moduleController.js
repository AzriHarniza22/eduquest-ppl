const Module = require('../models/Module');
const Progress = require('../models/Progress');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const LessonProgress = require('../models/LessonProgress');
const { checkBadgeEarned } = require('../utils/helpers');

const getAllModules = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { sdgId } = req.query;

    let query = {};
    if (sdgId) {
      query.sdgId = parseInt(sdgId);
    }

    const modules = await Module.find(query).sort({ order: 1 });
    
    const moduleList = await Promise.all(
      modules.map(async (module) => {
        const progress = await Progress.findOne({ userId, moduleId: module._id });
        return {
          id: module._id,
          title: module.title,
          description: module.description,
          duration: module.duration,
          sdgId: module.sdgId,
          completed: progress ? progress.completed : false,
          progress: progress ? progress.progress : 0,
          hasLesson: module.hasLesson || false,
          hasQuiz: module.hasQuiz || false
        };
      })
    );

    res.json(moduleList);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const getModuleById = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user.userId;

    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const progress = await Progress.findOne({ userId, moduleId });

    res.json({
      module: {
        id: module._id,
        title: module.title,
        description: module.description,
        content: module.content,
        duration: module.duration,
        videoUrl: module.videoUrl,
        topics: module.topics,
        sdgId: module.sdgId,
        hasLesson: module.hasLesson || false,
        hasQuiz: module.hasQuiz || false
      },
      progress: progress ? progress.progress : 0,
      topics: module.topics
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// NEW: Get module with lesson and quiz content
const getModuleWithContent = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user.userId;

    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Get lesson if exists
    let lesson = null;
    if (module.lessonId) {
      lesson = await Lesson.findById(module.lessonId);
    }

    // Get quiz if exists
    let quiz = null;
    if (module.quizId) {
      quiz = await Quiz.findById(module.quizId);
    }

    // Get module progress
    const moduleProgress = await Progress.findOne({ userId, moduleId });

    // Get lesson progress if lesson exists
    let lessonProgress = null;
    if (lesson) {
      lessonProgress = await LessonProgress.findOne({ 
        userId, 
        lessonId: lesson._id 
      });
    }

    res.json({
      module: {
        id: module._id,
        title: module.title,
        description: module.description,
        sdgId: module.sdgId,
        hasLesson: module.hasLesson || false,
        hasQuiz: module.hasQuiz || false
      },
      lesson: lesson ? {
        id: lesson._id,
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        videoUrl: lesson.videoUrl,
        duration: lesson.duration,
        objectives: lesson.objectives,
        difficulty: lesson.difficulty
      } : null,
      quiz: quiz ? {
        id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        timeLimit: quiz.timeLimit,
        passingScore: quiz.passingScore,
        maxAttempts: quiz.maxAttempts
      } : null,
      progress: {
        module: moduleProgress ? moduleProgress.progress : 0,
        lesson: lessonProgress ? lessonProgress.progress : 0,
        moduleCompleted: moduleProgress ? moduleProgress.completed : false,
        lessonCompleted: lessonProgress ? lessonProgress.completed : false
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// NEW: Start module and redirect to lesson
const startModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user.userId;

    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Create or update module progress
    let moduleProgress = await Progress.findOne({ userId, moduleId });
    if (!moduleProgress) {
      moduleProgress = new Progress({
        userId,
        moduleId,
        sdgId: module.sdgId,
        progress: 0,
        timeSpent: 0,
        completed: false
      });
      await moduleProgress.save();
    }

    // Check if module has lesson
    if (!module.hasLesson || !module.lessonId) {
      return res.status(400).json({ 
        message: 'This module does not have a lesson available' 
      });
    }

    // Get or create lesson progress
    const lesson = await Lesson.findById(module.lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Associated lesson not found' });
    }

    let lessonProgress = await LessonProgress.findOne({ 
      userId, 
      lessonId: lesson._id 
    });
    
    if (!lessonProgress) {
      lessonProgress = new LessonProgress({
        userId,
        lessonId: lesson._id,
        sdgId: module.sdgId,
        progress: 0,
        sectionsCompleted: [],
        timeSpent: 0,
        lastSection: 0,
        completed: false,
        startedAt: new Date(),
        lastAccessedAt: new Date()
      });
      await lessonProgress.save();
    } else {
      lessonProgress.lastAccessedAt = new Date();
      await lessonProgress.save();
    }

    res.json({
      message: 'Module started successfully',
      lessonUrl: `/lesson?sdg=${module.sdgId}&lesson=${lesson._id}`,
      moduleProgress: {
        moduleId: module._id,
        lessonId: lesson._id,
        progress: lessonProgress.progress,
        lastSection: lessonProgress.lastSection
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const updateModuleProgress = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { progress } = req.body;
    const userId = req.user.userId;

    let moduleProgress = await Progress.findOne({ userId, moduleId });
    
    if (!moduleProgress) {
      const module = await Module.findById(moduleId);
      moduleProgress = new Progress({
        userId,
        moduleId,
        sdgId: module.sdgId,
        progress: 0,
        timeSpent: 0,
        completed: false
      });
    }

    moduleProgress.progress = progress;
    moduleProgress.timeSpent = moduleProgress.timeSpent + 1;
    await moduleProgress.save();

    res.json({
      message: 'Progress updated successfully',
      newProgress: moduleProgress.progress
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const completeModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user.userId;

    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    let progress = await Progress.findOne({ userId, moduleId });
    if (!progress) {
      progress = new Progress({
        userId,
        moduleId,
        sdgId: module.sdgId,
        progress: 0,
        timeSpent: 0,
        completed: false
      });
    }

    progress.progress = 100;
    progress.completed = true;
    progress.completedAt = new Date();
    await progress.save();

    // Update user points
    const user = await User.findById(userId);
    user.points += 50; // Points for completing module
    await user.save();

    // Check for badge achievements
    const badges = await checkBadgeEarned(userId, 'module_complete');

    res.json({
      message: 'Module completed successfully',
      points: 50,
      badges
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const getLessonById = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user.userId;

    // Get module/lesson data
    const lesson = await Module.findById(moduleId);
    
    if (!lesson || !lesson.isActive) {
      return res.status(404).json({
        error: 'Lesson not found'
      });
    }

    // Get user's progress for this lesson
    const progress = await Progress.findOne({
      userId,
      moduleId,
      sdgId: lesson.sdgId
    });

    // Check if user has access to this SDG
    const user = await User.findById(userId);
    if (!user.completedSDGs.includes(lesson.sdgId) && user.currentSDG !== lesson.sdgId) {
      return res.status(403).json({
        error: 'Access denied. Please start this SDG journey first.'
      });
    }

    res.json({
      success: true,
      lesson: {
        _id: lesson._id,
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        videoUrl: lesson.videoUrl,
        sdgId: lesson.sdgId,
        duration: lesson.duration,
        topics: lesson.topics,
        order: lesson.order
      },
      progress: progress ? progress.progress : 0,
      completed: progress ? progress.completed : false
    });

  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({
      error: 'Failed to get lesson',
      message: error.message
    });
  }
};

// NEW: Get lessons by SDG
const getLessonsBySDG = async (req, res) => {
  try {
    const { sdgId } = req.params;
    const userId = req.user.userId;

    // Get all lessons for this SDG
    const lessons = await Module.find({
      sdgId: parseInt(sdgId),
      isActive: true
    }).sort({ order: 1 });

    // Get user's progress for all lessons
    const progressData = await Progress.find({
      userId,
      sdgId: parseInt(sdgId)
    });

    // Map progress to lessons
    const lessonsWithProgress = lessons.map(lesson => {
      const progress = progressData.find(p => p.moduleId.toString() === lesson._id.toString());
      return {
        _id: lesson._id,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        topics: lesson.topics,
        order: lesson.order,
        progress: progress ? progress.progress : 0,
        completed: progress ? progress.completed : false,
        hasLesson: lesson.hasLesson || false,
        hasQuiz: lesson.hasQuiz || false
      };
    });

    res.json({
      success: true,
      sdgId: parseInt(sdgId),
      lessons: lessonsWithProgress,
      totalLessons: lessons.length
    });

  } catch (error) {
    console.error('Get lessons by SDG error:', error);
    res.status(500).json({
      error: 'Failed to get lessons',
      message: error.message
    });
  }
};

module.exports = { 
  getAllModules, 
  getModuleById, 
  getModuleWithContent,
  startModule,
  updateModuleProgress, 
  completeModule, 
  getLessonById, 
  getLessonsBySDG 
};