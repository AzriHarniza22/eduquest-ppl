const express = require('express');
const router = express.Router();
const { 
  getQuizBySDG,
  getQuizByLesson,
  startQuiz,
  submitQuizAnswer,
  completeQuiz,
  getQuizResults,
  retakeQuiz,
  getQuizStatistics
} = require('../controllers/quizController');
const { isAdmin } = require('../middlewares/isAdmin');
const { 
  validateSDGId,
  validateLessonId,
  validateQuizId,
  validateQuizAnswer,
  validateCompleteQuiz
} = require('../middlewares/validation');

// Routes quiz untuk user
router.get('/quiz/sdg/:sdgId', validateSDGId, getQuizBySDG);              // Mengambil quiz berdasarkan SDG ID
router.get('/quiz/lesson/:lessonId', validateLessonId, getQuizByLesson);  // Mengambil quiz berdasarkan lesson ID
router.post('/quiz/:quizId/start', validateQuizId, startQuiz);            // Memulai attempt quiz baru
router.post('/quiz/:quizId/answer', validateQuizId, validateQuizAnswer, submitQuizAnswer); // Submit jawaban per pertanyaan
router.post('/quiz/:quizId/complete', validateQuizId, validateCompleteQuiz, completeQuiz); // Menyelesaikan dan menghitung skor quiz
router.get('/quiz/:quizId/results', validateQuizId, getQuizResults);      // Mengambil hasil quiz user
router.post('/quiz/:quizId/retake', validateQuizId, retakeQuiz);          // Mengecek dan membolehkan retake quiz

// Routes quiz statistics untuk admin
router.get('/quiz/:quizId/stats', isAdmin, validateQuizId, getQuizStatistics); // Statistik quiz untuk admin

module.exports = router;