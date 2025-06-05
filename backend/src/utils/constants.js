// Points system
const POINTS = {
  MODULE_COMPLETE: 50,
  CHALLENGE_COMPLETE: 100,
  DAILY_STREAK: 25,
  QUIZ_PERFECT: 50,
  QUIZ_BONUS: 10,
  FIRST_LOGIN: 10,
  WEEKLY_GOAL: 100
};

// Badge types
const BADGE_TYPES = [
  'Learning',
  'Quiz',
  'Streak',
  'Daily'
];

// Badge rarities
const BADGE_RARITIES = [
  'common',
  'rare',
  'epic',
  'legendary'
];

// Challenge types
const CHALLENGE_TYPES = [
  'daily',
  'weekly',
  'special',
  'quiz'
];

// Notification types
const NOTIFICATION_TYPES = [
  'badge',
  'challenge',
  'reminder',
  'achievement',
  'system'
];

// SDG information
const SDG_COUNT = 17;

const SDG_NAMES = [
  'No Poverty',
  'Zero Hunger',
  'Good Health and Well-being',
  'Quality Education',
  'Gender Equality',
  'Clean Water and Sanitation',
  'Affordable and Clean Energy',
  'Decent Work and Economic Growth',
  'Industry, Innovation and Infrastructure',
  'Reduced Inequality',
  'Sustainable Cities and Communities',
  'Responsible Consumption and Production',
  'Climate Action',
  'Life Below Water',
  'Life on Land',
  'Peace and Justice Strong Institutions',
  'Partnerships to achieve the Goal'
];

// User levels based on points
const USER_LEVELS = [
  { level: 1, minPoints: 0, maxPoints: 99, title: 'Beginner' },
  { level: 2, minPoints: 100, maxPoints: 299, title: 'Learner' },
  { level: 3, minPoints: 300, maxPoints: 599, title: 'Explorer' },
  { level: 4, minPoints: 600, maxPoints: 999, title: 'Achiever' },
  { level: 5, minPoints: 1000, maxPoints: 1999, title: 'Expert' },
  { level: 6, minPoints: 2000, maxPoints: 3999, title: 'Master' },
  { level: 7, minPoints: 4000, maxPoints: 7999, title: 'Champion' },
  { level: 8, minPoints: 8000, maxPoints: 15999, title: 'Legend' },
  { level: 9, minPoints: 16000, maxPoints: 31999, title: 'Hero' },
  { level: 10, minPoints: 32000, maxPoints: Infinity, title: 'Grandmaster' }
];

// Time limits for challenges (in minutes)
const CHALLENGE_TIME_LIMITS = {
  EASY: 10,
  MEDIUM: 15,
  HARD: 20,
  EXPERT: 30
};

// Progress status
const PROGRESS_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

// API response messages
const RESPONSE_MESSAGES = {
  SUCCESS: 'Operation completed successfully',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  INVALID_INPUT: 'Invalid input data',
  SERVER_ERROR: 'Internal server error'
};

// Leaderboard periods
const LEADERBOARD_PERIODS = [
  'weekly',
  'monthly',
  'alltime'
];

// File upload limits
const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'],
  MAX_FILES: 10
};

// Rate limiting
const RATE_LIMITS = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
  SKIP_SUCCESSFUL_REQUESTS: false
};

// Default pagination
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

// Streak requirements
const STREAK_REQUIREMENTS = {
  MIN_ACTIVITY_TIME: 5, // minutes
  DAILY_GOAL_POINTS: 50,
  MAX_STREAK_DAYS: 365
};

module.exports = {
  POINTS,
  BADGE_TYPES,
  BADGE_RARITIES,
  CHALLENGE_TYPES,
  NOTIFICATION_TYPES,
  SDG_COUNT,
  SDG_NAMES,
  USER_LEVELS,
  CHALLENGE_TIME_LIMITS,
  PROGRESS_STATUS,
  RESPONSE_MESSAGES,
  LEADERBOARD_PERIODS,
  UPLOAD_LIMITS,
  RATE_LIMITS,
  PAGINATION,
  STREAK_REQUIREMENTS
};