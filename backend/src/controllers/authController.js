const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../config/jwt');

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Semua field wajib diisi'
      });
    }

    // Check if user already exists (case insensitive)
    const existingUser = await User.findOne({ 
      email: email.toLowerCase() 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah terdaftar'
      });
    }

    // Create new user - password akan di-hash otomatis oleh pre-save middleware
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password.trim(), // Hanya trim, jangan hash manual
      points: 0,
      rank: 0,
      isAdmin: false,
      streak: 0,
      badges: [],
      completedSDGs: [],
      currentSDG: null,
      lastLogin: new Date()
    });

    await newUser.save(); // Pre-save middleware akan hash password di sini

    console.log('✅ User registered successfully:', newUser.email);

    // Generate token
    const token = generateToken(newUser._id, newUser.isAdmin);

    // Remove password from response
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      points: newUser.points,
      rank: newUser.rank,
      isAdmin: newUser.isAdmin,
      streak: newUser.streak
    };

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password wajib diisi'
      });
    }

    console.log('Login attempt for email:', email);

    // Find user by email (case insensitive)
    const user = await User.findOne({ 
      email: email.toLowerCase().trim() 
    });

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    console.log('User found:', user.email);
    
    // Gunakan method comparePassword dari model
    const isPasswordValid = await user.comparePassword(password.trim());
    console.log('✅ Password validation result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Password invalid for user:', email);
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id, user.isAdmin);

    // Prepare user response (exclude password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      points: user.points,
      rank: user.rank,
      isAdmin: user.isAdmin,
      streak: user.streak,
      badges: user.badges,
      completedSDGs: user.completedSDGs,
      currentSDG: user.currentSDG
    };

    console.log('Login successful for:', email);

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Logout User
const logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout berhasil'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
};

// Get Current User
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
};

// Reset password untuk user tertentu
const resetUserPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password baru wajib diisi'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    // Set password baru - akan di-hash otomatis oleh pre-save middleware
    user.password = newPassword.trim();
    await user.save();

    // Test password baru
    const testResult = await user.comparePassword(newPassword.trim());

    res.json({
      success: true,
      message: 'Password berhasil direset',
      email: user.email,
      testResult
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  resetUserPassword
};