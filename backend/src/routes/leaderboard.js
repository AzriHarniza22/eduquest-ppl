const express = require('express');
const router = express.Router();
const { getLeaderboard, getUserRank } = require('../controllers/leaderboardController');

// Routes leaderboard
router.get('/leaderboard', getLeaderboard);
router.get('/leaderboard/rank', getUserRank);

module.exports = router;