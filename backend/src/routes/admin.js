const express = require('express');
const router = express.Router();
const { 
  createModule, 
  updateModule, 
  deleteModule, 
  createChallenge, 
  createBadge, 
  getUserStats,
  // Lesson management functions [BARU]
  createLesson,
  updateLesson,
  deleteLesson,
  // Quiz management functions [BARU]
  createQuiz,
  updateQuiz,
  deleteQuiz,
  // Analytics functions [BARU]
  getLessonAnalytics,
  getQuizAnalytics,
  getContentOverview
} = require('../controllers/adminController');
const { isAdmin } = require('../middlewares/isAdmin');
const { 
  validateModule, 
  validateChallenge,
  // Validation functions untuk lesson & quiz [BARU]
  validateCreateLesson,
  validateUpdateLesson,
  validateCreateQuiz,
  validateUpdateQuiz
} = require('../middlewares/validation');

// Routes admin existing (semua routes memerlukan admin permission)
router.post('/modules', isAdmin, validateModule, createModule);
router.put('/modules/:id', isAdmin, validateModule, updateModule);
router.delete('/modules/:id', isAdmin, deleteModule);
router.post('/challenges', isAdmin, validateChallenge, createChallenge);
router.post('/badges', isAdmin, createBadge);
router.get('/stats', isAdmin, getUserStats);

// Routes lesson management untuk admin [BARU]
router.post('/lessons', isAdmin, validateCreateLesson, createLesson);
router.put('/lessons/:lessonId', isAdmin, validateUpdateLesson, updateLesson);
router.delete('/lessons/:lessonId', isAdmin, deleteLesson);

// Routes quiz management untuk admin [BARU]
router.post('/quiz', isAdmin, validateCreateQuiz, createQuiz);
router.put('/quiz/:quizId', isAdmin, validateUpdateQuiz, updateQuiz);
router.delete('/quiz/:quizId', isAdmin, deleteQuiz);

// Routes analytics untuk admin [BARU]
router.get('/analytics/lessons', isAdmin, getLessonAnalytics);
router.get('/analytics/quiz', isAdmin, getQuizAnalytics);
router.get('/analytics/overview', isAdmin, getContentOverview);

module.exports = router;