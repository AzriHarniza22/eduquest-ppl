const express = require('express');
const router = express.Router();
const { getAllModules, getModuleById, updateModuleProgress, completeModule } = require('../controllers/moduleController');

// Routes modules
router.get('/modules', getAllModules);
router.get('/modules/:id', getModuleById);
router.post('/modules/:id/progress', updateModuleProgress);
router.post('/modules/:id/complete', completeModule);

module.exports = router;