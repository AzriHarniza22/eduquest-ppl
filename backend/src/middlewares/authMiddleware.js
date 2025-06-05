const { verifyToken, extractToken } = require('../config/jwt');
const User = require('../models/User');

// Authenticate JWT Token
const authenticateToken = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
        error: 'NO_TOKEN'
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      console.error('Token verification failed:', error.message);
      
      return res.status(401).json({
        success: false,
        message: error.message,
        error: 'INVALID_TOKEN'
      });
    }

    // Check if user still exists
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User account is deactivated',
        error: 'USER_INACTIVE'
      });
    }

    // Add user info to request object
    req.user = {
      userId: decoded.userId,
      isAdmin: decoded.isAdmin,
      email: user.email,
      name: user.name,
      userDoc: user // Full user document
    };

    next();

  } catch (error) {
    console.error('Authentication middleware error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: 'AUTH_ERROR'
    });
  }
};

// Optional authentication (for public routes that can benefit from user data)
const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      // No token provided, continue without user data
      req.user = null;
      return next();
    }

    // Try to verify token
    try {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user && user.isActive) {
        req.user = {
          userId: decoded.userId,
          isAdmin: decoded.isAdmin,
          email: user.email,
          name: user.name,
          userDoc: user
        };
      } else {
        req.user = null;
      }
    } catch (error) {
      // Token is invalid, but continue without user data
      req.user = null;
    }

    next();

  } catch (error) {
    console.error('Optional auth middleware error:', error);
    req.user = null;
    next();
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
      error: 'NO_AUTH'
    });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
      error: 'NOT_ADMIN'
    });
  }

  next();
};

// Check if user owns the resource or is admin
const isOwnerOrAdmin = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'NO_AUTH'
      });
    }

    const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    // Allow if user is admin or owns the resource
    if (req.user.isAdmin || req.user.userId === resourceUserId) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Access denied. You can only access your own resources.',
      error: 'ACCESS_DENIED'
    });
  };
};

module.exports = {
  authenticateToken,
  optionalAuth,
  isAdmin,
  isOwnerOrAdmin
};