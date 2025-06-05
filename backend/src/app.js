const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const sdgRoutes = require('./routes/sdg');
const moduleRoutes = require('./routes/modules');
const challengeRoutes = require('./routes/challenges');
const badgeRoutes = require('./routes/badges');
const leaderboardRoutes = require('./routes/leaderboard');
const profileRoutes = require('./routes/profile');
const notificationRoutes = require('./routes/notifications');
const adminRoutes = require('./routes/admin');
const lessonRoutes = require('./routes/lessons');          // [BARU]
const quizRoutes = require('./routes/quiz');              // [BARU]

// Import middlewares
const { authenticateToken } = require('./middlewares/authMiddleware');

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'EduQuest Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);                              // Public routes (register, login)
app.use('/api', authenticateToken, dashboardRoutes);           // Protected routes
app.use('/api', authenticateToken, sdgRoutes);
app.use('/api', authenticateToken, moduleRoutes);
app.use('/api', authenticateToken, challengeRoutes);
app.use('/api', authenticateToken, badgeRoutes);
app.use('/api', authenticateToken, leaderboardRoutes);
app.use('/api', authenticateToken, profileRoutes);
app.use('/api', authenticateToken, notificationRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);         // Admin routes
app.use('/api', authenticateToken, lessonRoutes);              // [BARU] Lesson routes
app.use('/api', authenticateToken, quizRoutes);                // [BARU] Quiz routes

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to EduQuest API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      auth: '/api/auth/register, /api/auth/login',
      dashboard: '/api/dashboard',
      sdgs: '/api/sdgs',
      modules: '/api/modules',
      lessons: '/api/lessons, /api/lessons/sdg/:sdgId',        // [DIUBAH] Updated lesson endpoints
      quiz: '/api/quiz, /api/quiz/sdg/:sdgId',                 // [DIUBAH] Updated quiz endpoints
      challenges: '/api/challenges',
      badges: '/api/badges',
      leaderboard: '/api/leaderboard',
      profile: '/api/profile',
      notifications: '/api/notifications',
      admin: {
        general: '/api/admin/*',
        lessons: '/api/admin/lessons',                         // [BARU] Admin lesson management
        quiz: '/api/admin/quiz',                               // [BARU] Admin quiz management
        analytics: '/api/admin/analytics/*'                   // [BARU] Content analytics
      }
    }
  });
});

// Handle 404 - Route not found
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableRoutes: [
      // Public routes
      'GET /health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      
      // Protected user routes
      'GET /api/dashboard',
      'GET /api/sdgs',
      'GET /api/modules',
      'GET /api/modules/:moduleId/content',                    // [BARU] Module with content
      'POST /api/modules/:moduleId/start',                     // [BARU] Start module
      'GET /api/challenges',
      'GET /api/badges',
      'GET /api/leaderboard',
      'GET /api/profile',
      'GET /api/notifications',
      
      // Lesson routes [BARU]
      'GET /api/lessons',
      'GET /api/lessons/sdg/:sdgId',
      'GET /api/lessons/:lessonId',
      'POST /api/lessons/:lessonId/progress',
      'POST /api/lessons/:lessonId/complete',
      
      // Quiz routes [BARU]
      'GET /api/quiz/sdg/:sdgId',
      'GET /api/quiz/lesson/:lessonId',
      'POST /api/quiz/:quizId/start',
      'POST /api/quiz/:quizId/answer',
      'POST /api/quiz/:quizId/complete',
      'GET /api/quiz/:quizId/results',
      'POST /api/quiz/:quizId/retake',
      
      // Admin routes
      'GET /api/admin/*',
      'POST /api/admin/lessons',                               // [BARU] Create lesson
      'PUT /api/admin/lessons/:lessonId',                      // [BARU] Update lesson
      'DELETE /api/admin/lessons/:lessonId',                   // [BARU] Delete lesson
      'POST /api/admin/quiz',                                  // [BARU] Create quiz
      'PUT /api/admin/quiz/:quizId',                           // [BARU] Update quiz
      'DELETE /api/admin/quiz/:quizId',                        // [BARU] Delete quiz
      'GET /api/admin/analytics/lessons',                      // [BARU] Lesson analytics
      'GET /api/admin/analytics/quiz',                         // [BARU] Quiz analytics
      'GET /api/admin/analytics/overview'                      // [BARU] Content overview
    ]
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      error: 'Validation Error',
      messages: errors
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
      message: 'Please login again'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired',
      message: 'Please login again'
    });
  }
  
  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      error: 'Duplicate field',
      message: `${field} already exists`
    });
  }
  
  // Quiz-specific errors [BARU]
  if (err.name === 'QuizNotFoundError') {
    return res.status(404).json({
      error: 'Quiz not found',
      message: 'The requested quiz does not exist'
    });
  }
  
  if (err.name === 'QuizAttemptLimitError') {
    return res.status(400).json({
      error: 'Quiz attempt limit exceeded',
      message: 'You have reached the maximum number of attempts for this quiz'
    });
  }
  
  if (err.name === 'QuizTimeExpiredError') {
    return res.status(400).json({
      error: 'Quiz time expired',
      message: 'The time limit for this quiz has been exceeded'
    });
  }
  
  // Lesson-specific errors [BARU]
  if (err.name === 'LessonNotFoundError') {
    return res.status(404).json({
      error: 'Lesson not found',
      message: 'The requested lesson does not exist'
    });
  }
  
  if (err.name === 'LessonPrerequisiteError') {
    return res.status(400).json({
      error: 'Prerequisites not met',
      message: 'You must complete the required prerequisites before accessing this lesson'
    });
  }
  
  // Default error
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

module.exports = app;