const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, markAllAsRead } = require('../controllers/notificationController');

// Routes notifications
router.get('/notifications', getNotifications);
router.post('/notifications/mark-read', markAsRead);
router.post('/notifications/mark-all-read', markAllAsRead);

module.exports = router;