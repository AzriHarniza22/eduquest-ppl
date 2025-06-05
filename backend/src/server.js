const app = require('./app');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Set port
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log('🚀 =================================');
  console.log(`🚀 EduQuest Backend Server Started`);
  console.log('🚀 =================================');
  console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🚀 URL: http://localhost:${PORT}`);
  console.log(`🚀 Health Check: http://localhost:${PORT}/health`);
  console.log(`🚀 API Base URL: http://localhost:${PORT}/api`);
  console.log('🚀 =================================');
  
  // Log available endpoints
  console.log('📋 Available Endpoints:');
  console.log('   POST /api/register');
  console.log('   POST /api/login');
  console.log('   GET  /api/dashboard');
  console.log('   GET  /api/sdgs');
  console.log('   GET  /api/modules');
  console.log('   GET  /api/challenges');
  console.log('   GET  /api/badges');
  console.log('   GET  /api/leaderboard');
  console.log('   GET  /api/profile');
  console.log('   GET  /api/notifications');
  console.log('   POST /api/admin/*');
  console.log('🚀 =================================');
});

// Handle server shutdown gracefully
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed. Process terminated.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed. Process terminated.');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  console.log('🛑 Shutting down...');
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Promise Rejection:', err);
  console.log('🛑 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;