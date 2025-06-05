const express = require('express');
const router = express.Router();
const { getAllBadges, getUserBadges, checkBadgeProgress } = require('../controllers/badgeController');

// Routes badges
router.get('/badges', getAllBadges);
router.get('/badges/user', getUserBadges);
router.get('/badges/:id/progress', checkBadgeProgress);

module.exports = router;
