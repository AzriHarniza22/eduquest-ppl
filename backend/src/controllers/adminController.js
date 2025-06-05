const Module = require('../models/Module');
const Challenge = require('../models/Challenge');
const Badge = require('../models/Badge');
const User = require('../models/User');
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const LessonProgress = require('../models/LessonProgress');

// ===== EXISTING MODULE FUNCTIONS =====
// Create Module
const createModule = async (req, res) => {
  try {
    const { title, description, content, sdgId, duration, videoUrl } = req.body;

    const module = new Module({
      title,
      description,
      content,
      sdgId,
      duration,
      videoUrl,
      topics: [],
      order: 1,
      createdAt: new Date()
    });

    await module.save();

    res.status(201).json({
      message: 'Module created successfully',
      module
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create module',
      message: error.message
    });
  }
};

// Update Module
const updateModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { title, description, content, duration, videoUrl } = req.body;

    const module = await Module.findByIdAndUpdate(
      moduleId,
      { title, description, content, duration, videoUrl },
      { new: true }
    );

    if (!module) {
      return res.status(404).json({
        error: 'Module not found'
      });
    }

    res.json({
      message: 'Module updated successfully',
      module
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update module',
      message: error.message
    });
  }
};

// Delete Module
const deleteModule = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const module = await Module.findByIdAndDelete(moduleId);

    if (!module) {
      return res.status(404).json({
        error: 'Module not found'
      });
    }

    res.json({
      message: 'Module deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete module',
      message: error.message
    });
  }
};

// ===== EXISTING CHALLENGE & BADGE FUNCTIONS =====
// Create Challenge
const createChallenge = async (req, res) => {
  try {
    const { title, description, sdgNumber, questions, timeMinutes, points } = req.body;

    const challenge = new Challenge({
      title,
      description,
      sdgNumber,
      questions,
      timeMinutes,
      points,
      bonus: Math.floor(points * 0.5),
      type: 'special',
      isActive: true,
      createdAt: new Date()
    });

    await challenge.save();

    res.status(201).json({
      message: 'Challenge created successfully',
      challenge
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create challenge',
      message: error.message
    });
  }
};

// Create Badge
const createBadge = async (req, res) => {
  try {
    const { title, description, category, requirements, points, icon } = req.body;

    const badge = new Badge({
      title,
      description,
      category,
      icon,
      points,
      requirements,
      rarity: 'common'
    });

    await badge.save();

    res.status(201).json({
      message: 'Badge created successfully',
      badge
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create badge',
      message: error.message
    });
  }
};

// ===== NEW LESSON MANAGEMENT FUNCTIONS =====
// Create Lesson
const createLesson = async (req, res) => {
  try {
    const { 
      sdgId, 
      title, 
      description, 
      content, 
      videoUrl, 
      duration, 
      objectives, 
      prerequisites, 
      difficulty, 
      tags 
    } = req.body;

    const lesson = new Lesson({
      sdgId,
      title,
      description,
      content,
      videoUrl,
      duration,
      objectives: objectives || [],
      prerequisites: prerequisites || [],
      difficulty: difficulty || 'beginner',
      tags: tags || [],
      isActive: true,
      createdBy: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await lesson.save();

    res.status(201).json({
      message: 'Lesson created successfully',
      lesson
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create lesson',
      message: error.message
    });
  }
};

// Update Lesson
const updateLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    const lesson = await Lesson.findByIdAndUpdate(
      lessonId,
      updateData,
      { new: true }
    );

    if (!lesson) {
      return res.status(404).json({
        error: 'Lesson not found'
      });
    }

    res.json({
      message: 'Lesson updated successfully',
      lesson
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update lesson',
      message: error.message
    });
  }
};

// Delete Lesson
const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    // Check if lesson has associated quizzes
    const associatedQuizzes = await Quiz.find({ lessonId });
    if (associatedQuizzes.length > 0) {
      return res.status(400).json({
        error: 'Cannot delete lesson with associated quizzes',
        message: 'Please delete associated quizzes first'
      });
    }

    const lesson = await Lesson.findByIdAndDelete(lessonId);

    if (!lesson) {
      return res.status(404).json({
        error: 'Lesson not found'
      });
    }

    // Delete associated lesson progress
    await LessonProgress.deleteMany({ lessonId });

    res.json({
      message: 'Lesson deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete lesson',
      message: error.message
    });
  }
};

// ===== NEW QUIZ MANAGEMENT FUNCTIONS =====
// Create Quiz
const createQuiz = async (req, res) => {
  try {
    const {
      sdgId,
      lessonId,
      title,
      description,
      questions,
      timeLimit,
      passingScore,
      maxAttempts,
      shuffleQuestions,
      shuffleOptions,
      showResultsImmediately
    } = req.body;

    const quiz = new Quiz({
      sdgId,
      lessonId,
      title,
      description,
      questions,
      timeLimit: timeLimit || 15,
      passingScore: passingScore || 70,
      maxAttempts: maxAttempts || 3,
      shuffleQuestions: shuffleQuestions || false,
      shuffleOptions: shuffleOptions || false,
      showResultsImmediately: showResultsImmediately || true,
      isActive: true,
      createdBy: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await quiz.save();

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create quiz',
      message: error.message
    });
  }
};

// Update Quiz
const updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      updateData,
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({
        error: 'Quiz not found'
      });
    }

    res.json({
      message: 'Quiz updated successfully',
      quiz
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update quiz',
      message: error.message
    });
  }
};

// Delete Quiz
const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findByIdAndDelete(quizId);

    if (!quiz) {
      return res.status(404).json({
        error: 'Quiz not found'
      });
    }

    // Delete associated quiz results
    await QuizResult.deleteMany({ quizId });

    res.json({
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete quiz',
      message: error.message
    });
  }
};

// ===== NEW ANALYTICS FUNCTIONS =====
// Get Lesson Analytics
const getLessonAnalytics = async (req, res) => {
  try {
    const { lessonId } = req.query;

    if (lessonId) {
      // Analytics for specific lesson
      const lesson = await Lesson.findById(lessonId);
      if (!lesson) {
        return res.status(404).json({
          error: 'Lesson not found'
        });
      }

      const totalUsers = await LessonProgress.countDocuments({ lessonId });
      const completedUsers = await LessonProgress.countDocuments({ 
        lessonId, 
        completed: true 
      });
      const avgTimeSpent = await LessonProgress.aggregate([
        { $match: { lessonId: lesson._id } },
        { $group: { _id: null, avgTime: { $avg: '$timeSpent' } } }
      ]);
      const avgProgress = await LessonProgress.aggregate([
        { $match: { lessonId: lesson._id } },
        { $group: { _id: null, avgProgress: { $avg: '$progress' } } }
      ]);

      res.json({
        lesson: {
          id: lesson._id,
          title: lesson.title,
          sdgId: lesson.sdgId
        },
        totalUsers,
        completedUsers,
        completionRate: totalUsers > 0 ? (completedUsers / totalUsers * 100).toFixed(2) : 0,
        avgTimeSpent: avgTimeSpent[0]?.avgTime || 0,
        avgProgress: avgProgress[0]?.avgProgress || 0
      });
    } else {
      // Analytics for all lessons
      const lessonStats = await Lesson.aggregate([
        {
          $lookup: {
            from: 'lessonprogresses',
            localField: '_id',
            foreignField: 'lessonId',
            as: 'progress'
          }
        },
        {
          $project: {
            title: 1,
            sdgId: 1,
            totalUsers: { $size: '$progress' },
            completedUsers: {
              $size: {
                $filter: {
                  input: '$progress',
                  cond: { $eq: ['$$this.completed', true] }
                }
              }
            }
          }
        },
        {
          $addFields: {
            completionRate: {
              $cond: {
                if: { $gt: ['$totalUsers', 0] },
                then: { $multiply: [{ $divide: ['$completedUsers', '$totalUsers'] }, 100] },
                else: 0
              }
            }
          }
        },
        { $sort: { completionRate: -1 } }
      ]);

      const topLessons = lessonStats.slice(0, 5);
      const totalLessons = await Lesson.countDocuments();
      const avgCompletionRate = lessonStats.length > 0 
        ? lessonStats.reduce((sum, lesson) => sum + lesson.completionRate, 0) / lessonStats.length
        : 0;

      res.json({
        lessonStats,
        topLessons,
        totalLessons,
        avgCompletionRate: avgCompletionRate.toFixed(2)
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get lesson analytics',
      message: error.message
    });
  }
};

// Get Quiz Analytics
const getQuizAnalytics = async (req, res) => {
  try {
    const { quizId } = req.query;

    if (quizId) {
      // Analytics for specific quiz
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({
          error: 'Quiz not found'
        });
      }

      const totalAttempts = await QuizResult.countDocuments({ quizId });
      const passedAttempts = await QuizResult.countDocuments({ 
        quizId, 
        passed: true 
      });
      const avgScore = await QuizResult.aggregate([
        { $match: { quizId: quiz._id } },
        { $group: { _id: null, avgScore: { $avg: '$score' } } }
      ]);

      // Question statistics
      const questionStats = await QuizResult.aggregate([
        { $match: { quizId: quiz._id } },
        { $unwind: '$answers' },
        {
          $group: {
            _id: '$answers.questionId',
            totalAnswers: { $sum: 1 },
            correctAnswers: {
              $sum: { $cond: ['$answers.isCorrect', 1, 0] }
            }
          }
        },
        {
          $addFields: {
            correctPercentage: {
              $multiply: [{ $divide: ['$correctAnswers', '$totalAnswers'] }, 100]
            }
          }
        }
      ]);

      res.json({
        quiz: {
          id: quiz._id,
          title: quiz.title,
          sdgId: quiz.sdgId
        },
        totalAttempts,
        passedAttempts,
        passRate: totalAttempts > 0 ? (passedAttempts / totalAttempts * 100).toFixed(2) : 0,
        avgScore: avgScore[0]?.avgScore || 0,
        questionStats
      });
    } else {
      // Analytics for all quizzes
      const quizStats = await Quiz.aggregate([
        {
          $lookup: {
            from: 'quizresults',
            localField: '_id',
            foreignField: 'quizId',
            as: 'results'
          }
        },
        {
          $project: {
            title: 1,
            sdgId: 1,
            totalAttempts: { $size: '$results' },
            passedAttempts: {
              $size: {
                $filter: {
                  input: '$results',
                  cond: { $eq: ['$$this.passed', true] }
                }
              }
            },
            avgScore: { $avg: '$results.score' }
          }
        },
        {
          $addFields: {
            passRate: {
              $cond: {
                if: { $gt: ['$totalAttempts', 0] },
                then: { $multiply: [{ $divide: ['$passedAttempts', '$totalAttempts'] }, 100] },
                else: 0
              }
            }
          }
        },
        { $sort: { passRate: -1 } }
      ]);

      const topQuizzes = quizStats.slice(0, 5);
      const totalQuizzes = await Quiz.countDocuments();
      const avgPassRate = quizStats.length > 0 
        ? quizStats.reduce((sum, quiz) => sum + quiz.passRate, 0) / quizStats.length
        : 0;

      res.json({
        quizStats,
        topQuizzes,
        totalQuizzes,
        avgPassRate: avgPassRate.toFixed(2)
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get quiz analytics',
      message: error.message
    });
  }
};

// Get Content Overview
const getContentOverview = async (req, res) => {
  try {
    const totalLessons = await Lesson.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalUsers = await User.countDocuments();
    
    // Recent activity (last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentLessonProgress = await LessonProgress.countDocuments({
      createdAt: { $gte: weekAgo }
    });
    const recentQuizAttempts = await QuizResult.countDocuments({
      createdAt: { $gte: weekAgo }
    });
    const recentCompletions = await LessonProgress.countDocuments({
      completedAt: { $gte: weekAgo },
      completed: true
    });

    // Active lessons/quizzes
    const activeLessons = await Lesson.countDocuments({ isActive: true });
    const activeQuizzes = await Quiz.countDocuments({ isActive: true });

    res.json({
      totalLessons,
      totalQuizzes,
      totalUsers,
      activeLessons,
      activeQuizzes,
      recentActivity: {
        lessonProgress: recentLessonProgress,
        quizAttempts: recentQuizAttempts,
        completions: recentCompletions
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get content overview',
      message: error.message
    });
  }
};

// ===== EXISTING USER STATS FUNCTION =====
// Get User Stats
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const completedModules = await Progress.countDocuments({ completed: true });
    const totalPointsResult = await User.aggregate([
      { $group: { _id: null, total: { $sum: '$points' } } }
    ]);
    const totalPoints = totalPointsResult[0]?.total || 0;

    res.json({
      totalUsers,
      activeUsers,
      completedModules,
      totalPoints
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get user stats',
      message: error.message
    });
  }
};

module.exports = {
  // Existing functions
  createModule,
  updateModule,
  deleteModule,
  createChallenge,
  createBadge,
  getUserStats,
  
  // New lesson management functions
  createLesson,
  updateLesson,
  deleteLesson,
  
  // New quiz management functions
  createQuiz,
  updateQuiz,
  deleteQuiz,
  
  // New analytics functions
  getLessonAnalytics,
  getQuizAnalytics,
  getContentOverview
};