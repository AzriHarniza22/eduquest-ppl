const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getProfileStats } = require('../controllers/profileController');

// Routes profile
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/profile/stats', getProfileStats);

module.exports = router;