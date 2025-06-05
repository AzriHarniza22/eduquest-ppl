const { body, param, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Validation rules
const validateRegister = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

const validateModule = [
  body('title')
    .notEmpty()
    .withMessage('Module title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Module description is required'),
  body('content')
    .notEmpty()
    .withMessage('Module content is required'),
  body('sdgId')
    .isInt({ min: 1, max: 17 })
    .withMessage('SDG ID must be between 1 and 17'),
  body('duration')
    .notEmpty()
    .withMessage('Duration is required'),
  handleValidationErrors
];

const validateChallenge = [
  body('title')
    .notEmpty()
    .withMessage('Challenge title is required'),
  body('description')
    .notEmpty()
    .withMessage('Challenge description is required'),
  body('sdgNumber')
    .isInt({ min: 1, max: 17 })
    .withMessage('SDG number must be between 1 and 17'),
  body('questions')
    .isArray({ min: 1 })
    .withMessage('At least one question is required'),
  body('timeMinutes')
    .isInt({ min: 1 })
    .withMessage('Time must be at least 1 minute'),
  body('points')
    .isInt({ min: 1 })
    .withMessage('Points must be at least 1'),
  handleValidationErrors
];

// Validate SDG ID (1-17)
const validateSDGId = [
  param('sdgId').isInt({ min: 1, max: 17 }).withMessage('SDG ID must be between 1 and 17'),
  handleValidationErrors
];

// Validate Lesson ID (MongoDB ObjectId)
const validateLessonId = [
  param('lessonId').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid lesson ID format');
    }
    return true;
  }),
  handleValidationErrors
];

// Validate Quiz ID (MongoDB ObjectId)
const validateQuizId = [
  param('quizId').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid quiz ID format');
    }
    return true;
  }),
  handleValidationErrors
];

// Validate lesson creation
const validateCreateLesson = [
  body('sdgId').isInt({ min: 1, max: 17 }).withMessage('SDG ID must be between 1 and 17'),
  body('title').isLength({ min: 3, max: 200 }).withMessage('Title must be between 3-200 characters'),
  body('description').isLength({ min: 10, max: 500 }).withMessage('Description must be between 10-500 characters'),
  body('content').isArray({ min: 1 }).withMessage('Content must be an array with at least one item'),
  body('content.*.type').isIn(['text', 'video', 'image']).withMessage('Content type must be text, video, or image'),
  body('content.*.title').isLength({ min: 1, max: 100 }).withMessage('Content title is required'),
  body('content.*.data').notEmpty().withMessage('Content data is required'),
  body('content.*.order').isInt({ min: 0 }).withMessage('Content order must be a non-negative integer'),
  body('videoUrl').optional().isURL().withMessage('Video URL must be valid'),
  body('duration').isInt({ min: 1, max: 300 }).withMessage('Duration must be between 1-300 minutes'),
  body('objectives').optional().isArray().withMessage('Objectives must be an array'),
  body('prerequisites').optional().isArray().withMessage('Prerequisites must be an array'),
  body('difficulty').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Difficulty must be beginner, intermediate, or advanced'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  handleValidationErrors
];

// Validate lesson update
const validateUpdateLesson = [
  body('sdgId').optional().isInt({ min: 1, max: 17 }).withMessage('SDG ID must be between 1 and 17'),
  body('title').optional().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3-200 characters'),
  body('description').optional().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10-500 characters'),
  body('content').optional().isArray({ min: 1 }).withMessage('Content must be an array with at least one item'),
  body('videoUrl').optional().isURL().withMessage('Video URL must be valid'),
  body('duration').optional().isInt({ min: 1, max: 300 }).withMessage('Duration must be between 1-300 minutes'),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Difficulty must be beginner, intermediate, or advanced'),
  handleValidationErrors
];

// Validate lesson progress update
const validateLessonProgress = [
  body('sectionIndex').isInt({ min: 0 }).withMessage('Section index must be a non-negative integer'),
  body('timeSpent').optional().isInt({ min: 0 }).withMessage('Time spent must be a non-negative integer'),
  handleValidationErrors
];

// Validate quiz creation
const validateCreateQuiz = [
  body('sdgId').isInt({ min: 1, max: 17 }).withMessage('SDG ID must be between 1 and 17'),
  body('lessonId').optional().custom((value) => {
    if (value && !mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid lesson ID format');
    }
    return true;
  }),
  body('title').isLength({ min: 3, max: 200 }).withMessage('Title must be between 3-200 characters'),
  body('description').isLength({ min: 10, max: 500 }).withMessage('Description must be between 10-500 characters'),
  body('questions').isArray({ min: 1 }).withMessage('Questions must be an array with at least one item'),
  body('questions.*.question').isLength({ min: 10 }).withMessage('Question must be at least 10 characters'),
  body('questions.*.type').isIn(['multiple_choice', 'true_false', 'essay']).withMessage('Question type must be multiple_choice, true_false, or essay'),
  body('questions.*.correctAnswer').notEmpty().withMessage('Correct answer is required'),
  body('questions.*.points').isInt({ min: 1, max: 100 }).withMessage('Points must be between 1-100'),
  body('questions.*.order').isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
  body('timeLimit').isInt({ min: 1, max: 180 }).withMessage('Time limit must be between 1-180 minutes'),
  body('passingScore').isInt({ min: 1, max: 100 }).withMessage('Passing score must be between 1-100'),
  body('maxAttempts').isInt({ min: 1, max: 10 }).withMessage('Max attempts must be between 1-10'),
  handleValidationErrors
];

// Validate quiz update
const validateUpdateQuiz = [
  body('sdgId').optional().isInt({ min: 1, max: 17 }).withMessage('SDG ID must be between 1 and 17'),
  body('title').optional().isLength({ min: 3, max: 200 }).withMessage('Title must be between 3-200 characters'),
  body('description').optional().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10-500 characters'),
  body('timeLimit').optional().isInt({ min: 1, max: 180 }).withMessage('Time limit must be between 1-180 minutes'),
  body('passingScore').optional().isInt({ min: 1, max: 100 }).withMessage('Passing score must be between 1-100'),
  body('maxAttempts').optional().isInt({ min: 1, max: 10 }).withMessage('Max attempts must be between 1-10'),
  handleValidationErrors
];

// Validate quiz answer submission
const validateQuizAnswer = [
  body('quizId').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid quiz ID format');
    }
    return true;
  }),
  body('questionId').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid question ID format');
    }
    return true;
  }),
  body('answer').notEmpty().withMessage('Answer is required'),
  handleValidationErrors
];

// Validate quiz completion
const validateCompleteQuiz = [
  body('quizId').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid quiz ID format');
    }
    return true;
  }),
  body('answers').isArray({ min: 1 }).withMessage('Answers must be an array with at least one item'),
  body('answers.*.questionId').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid question ID format');
    }
    return true;
  }),
  body('answers.*.answer').notEmpty().withMessage('Answer is required'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateSDGId,
  validateLessonId,
  validateQuizId,
  validateCreateLesson,
  validateUpdateLesson,
  validateLessonProgress,
  validateCreateQuiz,
  validateUpdateQuiz,
  validateQuizAnswer,
  validateCompleteQuiz,
  validateModule,      
  validateChallenge
};