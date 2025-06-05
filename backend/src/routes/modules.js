const express = require('express');
const router = express.Router();
const { 
  getAllModules, 
  getModuleById, 
  updateModuleProgress, 
  completeModule, 
  getLessonById, 
  getLessonsBySDG,
  getModuleWithContent,  // [BARU]
  startModule           // [BARU]
} = require('../controllers/moduleController');

// Routes modules (existing)
router.get('/modules', getAllModules);
router.get('/modules/:id', getModuleById);
router.get('/lesson/:moduleId', getLessonById);
router.get('/sdg/:sdgId/lessons', getLessonsBySDG);
router.post('/modules/:id/progress', updateModuleProgress);
router.post('/modules/:id/complete', completeModule);

// Routes tambahan untuk integrasi lesson & quiz [BARU]
router.get('/modules/:moduleId/content', getModuleWithContent);  // Mengambil module dengan lesson dan quiz
router.post('/modules/:moduleId/start', startModule);           // Memulai module dan redirect ke lesson

module.exports = router;