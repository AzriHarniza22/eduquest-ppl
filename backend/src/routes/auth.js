const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middlewares/validation');

// Routes autentikasi
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

module.exports = router;