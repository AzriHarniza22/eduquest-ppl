const Lesson = require('../models/Lesson');
const LessonProgress = require('../models/LessonProgress');
const Progress = require('../models/Progress');
const { calculateLessonProgress, updateLessonStreak } = require('../utils/helpers');

// GET /api/lessons/sdg/:sdgId
const getLessonBySDG = async (req, res) => {
  try {
    const { sdgId } = req.params;
    const userId = req.user.id;

    // Validate SDG ID
    if (!sdgId || sdgId < 1 || sdgId > 17) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid SDG ID. Must be between 1 and 17.' 
      });
    }

    // Get lesson by SDG
    const lesson = await Lesson.getBySDGId(parseInt(sdgId));
    if (!lesson) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lesson not found for this SDG.' 
      });
    }

    // Get user progress
    const userProgress = await LessonProgress.getByLessonId(lesson._id, userId);

    res.json({
      success: true,
      data: {
        lesson,
        userProgress: userProgress || {
          progress: 0,
          sectionsCompleted: [],
          timeSpent: 0,
          lastSection: 0,
          completed: false
        }
      }
    });
  } catch (error) {
    console.error('Error in getLessonBySDG:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error.' 
    });
  }
};

// GET /api/lessons/:lessonId
const getLessonContent = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;

    // Get lesson
    const lesson = await Lesson.findById(lessonId);
    if (!lesson || !lesson.isActive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lesson not found.' 
      });
    }

    // Get user progress
    const progress = await LessonProgress.getByLessonId(lessonId, userId);

    // Determine next section
    const nextSection = progress ? progress.lastSection + 1 : 0;

    res.json({
      success: true,
      data: {
        lesson,
        progress: progress || {
          progress: 0,
          sectionsCompleted: [],
          timeSpent: 0,
          lastSection: 0,
          completed: false
        },
        nextSection: nextSection < lesson.content.length ? nextSection : null
      }
    });
  } catch (error) {
    console.error('Error in getLessonContent:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error.' 
    });
  }
};

// POST /api/lessons/:lessonId/progress
const updateLessonProgress = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { sectionIndex, timeSpent } = req.body;
    const userId = req.user.id;

    // Validate input
    if (sectionIndex === undefined || timeSpent === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Section index and time spent are required.' 
      });
    }

    // Get lesson
    const lesson = await Lesson.findById(lessonId);
    if (!lesson || !lesson.isActive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lesson not found.' 
      });
    }

    // Get or create progress
    let progress = await LessonProgress.getByLessonId(lessonId, userId);
    
    if (!progress) {
      progress = await LessonProgress.create({
        userId,
        lessonId,
        sdgId: lesson.sdgId,
        sectionsCompleted: [],
        timeSpent: 0,
        lastSection: 0
      });
    }

    // Update sections completed
    const sectionsCompleted = [...progress.sectionsCompleted];
    if (!sectionsCompleted.includes(sectionIndex)) {
      sectionsCompleted.push(sectionIndex);
    }

    // Calculate new progress
    const newProgress = calculateLessonProgress(sectionsCompleted, lesson.content.length);
    const completed = newProgress >= 100;

    // Update progress
    const updatedProgress = await LessonProgress.updateProgress(userId, lessonId, {
      progress: newProgress,
      sectionsCompleted,
      timeSpent: progress.timeSpent + timeSpent,
      lastSection: Math.max(progress.lastSection, sectionIndex),
      completed,
      completedAt: completed ? new Date() : undefined
    });

    res.json({
      success: true,
      message: 'Progress updated successfully.',
      data: {
        progress: updatedProgress.progress,
        completed: updatedProgress.completed
      }
    });
  } catch (error) {
    console.error('Error in updateLessonProgress:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error.' 
    });
  }
};

// POST /api/lessons/:lessonId/complete
const markLessonComplete = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;

    // Get lesson
    const lesson = await Lesson.findById(lessonId);
    if (!lesson || !lesson.isActive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lesson not found.' 
      });
    }

    // Mark lesson as complete
    const lessonProgress = await LessonProgress.markComplete(userId, lessonId);

    // Update user's overall progress
    const userProgress = await Progress.findOne({ userId });
    if (userProgress) {
      const sdgProgress = userProgress.sdgProgress.find(p => p.sdgId === lesson.sdgId);
      if (sdgProgress) {
        sdgProgress.lessonProgress = 100;
        sdgProgress.completedModules = Math.max(sdgProgress.completedModules, 1);
        await userProgress.save();
      }
    }

    // Update streak
    const newStreak = await updateLessonStreak(userId);

    // Calculate points awarded
    const points = lesson.difficulty === 'beginner' ? 50 : 
                  lesson.difficulty === 'intermediate' ? 75 : 100;

    // Check for quiz availability
    const Quiz = require('../models/Quiz');
    const quiz = await Quiz.getByLessonId(lessonId);

    res.json({
      success: true,
      message: 'Lesson completed successfully!',
      data: {
        points,
        badges: [], // TODO: Implement badge system
        quizAvailable: !!quiz
      }
    });
  } catch (error) {
    console.error('Error in markLessonComplete:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error.' 
    });
  }
};

// GET /api/lessons
const getAllLessons = async (req, res) => {
  try {
    const { page = 1, limit = 10, sdgId } = req.query;
    const userId = req.user.id;

    const filters = {};
    if (sdgId) filters.sdgId = parseInt(sdgId);

    // Get lessons
    const lessons = await Lesson.getAll(filters);

    // Get user progress for each lesson
    const lessonsWithProgress = await Promise.all(
      lessons.map(async (lesson) => {
        const progress = await LessonProgress.getByLessonId(lesson._id, userId);
        return {
          ...lesson.toObject(),
          userProgress: progress || {
            progress: 0,
            completed: false,
            timeSpent: 0
          }
        };
      })
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedLessons = lessonsWithProgress.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        lessons: paginatedLessons,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(lessonsWithProgress.length / limit),
          totalItems: lessonsWithProgress.length,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Error in getAllLessons:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error.' 
    });
  }
};

// GET /api/lessons/:lessonId/stats (Admin only)
const getLessonStatistics = async (req, res) => {
  try {
    const { lessonId } = req.params;

    // Get lesson statistics
    const stats = await LessonProgress.getStatistics(lessonId);

    if (!stats.length) {
      return res.json({
        success: true,
        data: {
          totalUsers: 0,
          completedUsers: 0,
          avgTimeSpent: 0,
          avgProgress: 0,
          completionRate: 0
        }
      });
    }

    res.json({
      success: true,
      data: stats[0]
    });
  } catch (error) {
    console.error('Error in getLessonStatistics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error.' 
    });
  }
};

module.exports = {
  getLessonBySDG,
  getLessonContent,
  updateLessonProgress,
  markLessonComplete,
  getAllLessons,
  getLessonStatistics
};