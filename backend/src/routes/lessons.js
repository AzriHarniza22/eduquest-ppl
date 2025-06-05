const express = require('express');
const router = express.Router();
const { 
  getLessonBySDG,
  getLessonContent,
  updateLessonProgress,
  markLessonComplete,
  getAllLessons,
  getLessonStatistics
} = require('../controllers/lessonController');
const { isAdmin } = require('../middlewares/isAdmin');
const { 
  validateLessonProgress,
  validateSDGId,
  validateLessonId
} = require('../middlewares/validation');

// Routes lesson untuk user
router.get('/lessons', getAllLessons);                                    // Mengambil semua lesson dengan filter
router.get('/lessons/sdg/:sdgId', validateSDGId, getLessonBySDG);         // Mengambil lesson berdasarkan SDG ID
router.get('/lessons/:lessonId', validateLessonId, getLessonContent);     // Mengambil konten lesson dengan progress user
router.post('/lessons/:lessonId/progress', validateLessonId, validateLessonProgress, updateLessonProgress); // Update progress lesson user
router.post('/lessons/:lessonId/complete', validateLessonId, markLessonComplete); // Menandai lesson sebagai selesai

// Routes lesson statistics untuk admin
router.get('/lessons/:lessonId/stats', isAdmin, validateLessonId, getLessonStatistics); // Statistik lesson untuk admin

module.exports = router;