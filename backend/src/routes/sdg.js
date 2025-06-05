const express = require('express');
const router = express.Router();
const { getAllSDGs, startSDG, getSDGProgress } = require('../controllers/sdgController');

// Routes SDG
router.get('/sdgs', getAllSDGs);
router.post('/sdgs/start', startSDG);
router.get('/sdgs/:id/progress', getSDGProgress);

module.exports = router;