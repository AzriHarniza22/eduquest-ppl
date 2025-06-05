const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId, isAdmin = false) => {
  if (!userId) {
    throw new Error('User ID is required to generate token');
  }

  const payload = {
    userId: userId.toString(), // Ensure it's a string
    isAdmin: Boolean(isAdmin),
    iat: Math.floor(Date.now() / 1000)
  };

  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRE || '7d';

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  try {
    return jwt.sign(payload, secret, { expiresIn });
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token');
  }
};

// Verify JWT Token
const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token is required');
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw new Error('Token verification failed');
    }
  }
};

// Extract token from request header
const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return null;
  }

  // Check if header starts with 'Bearer '
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim(); // Remove 'Bearer ' prefix and trim
  }

  // Return token as is if no Bearer prefix
  return authHeader.trim();
};

// Generate refresh token (for future use)
const generateRefreshToken = (userId) => {
  if (!userId) {
    throw new Error('User ID is required to generate refresh token');
  }

  const payload = {
    userId: userId.toString(),
    type: 'refresh',
    iat: Math.floor(Date.now() / 1000)
  };

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  try {
    return jwt.sign(payload, secret, { expiresIn: '30d' });
  } catch (error) {
    console.error('Error generating refresh token:', error);
    throw new Error('Failed to generate refresh token');
  }
};

// Decode token without verification (for debugging)
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  extractToken,
  generateRefreshToken,
  decodeToken,
  isTokenExpired
};