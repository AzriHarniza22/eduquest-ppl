// controllers/quizController.js - EXTENDED VERSION
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const Module = require('../models/Module');
const User = require('../models/User');
const Progress = require('../models/Progress');
const { checkBadgeEarned, updateUserRank } = require('../utils/helpers');

// Get quiz by SDG ID
const getQuizBySDG = async (req, res) => {
  try {
    const { sdgId } = req.params;
    const userId = req.user.userId;

    const quizzes = await Quiz.find({
      sdgId: parseInt(sdgId),
      isActive: true
    }).populate('moduleId', 'title');

    res.json({
      success: true,
      quizzes: quizzes.map(quiz => ({
        _id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        moduleTitle: quiz.moduleId.title,
        timeMinutes: quiz.timeMinutes,
        totalQuestions: quiz.questions.length,
        points: quiz.points
      }))
    });

  } catch (error) {
    console.error('Get quiz by SDG error:', error);
    res.status(500).json({
      error: 'Failed to get quizzes',
      message: error.message
    });
  }
};

// Get quiz by lesson ID (alias for getQuizByModule)
const getQuizByLesson = async (req, res) => {
  try {
    req.params.moduleId = req.params.lessonId;
    return await getQuizByModule(req, res);
  } catch (error) {
    console.error('Get quiz by lesson error:', error);
    res.status(500).json({
      error: 'Failed to get quiz',
      message: error.message
    });
  }
};

// Start quiz (prepare quiz session)
const startQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user.userId;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        error: 'Quiz not found'
      });
    }

    // Check if user already has active session
    const existingResult = await QuizResult.findOne({
      userId,
      quizId,
      completed: false
    });

    if (existingResult) {
      return res.status(400).json({
        error: 'Quiz session already active'
      });
    }

    // Create new quiz session
    const quizSession = new QuizResult({
      userId,
      quizId,
      moduleId: quiz.moduleId,
      sdgId: quiz.sdgId,
      startedAt: new Date(),
      completed: false
    });

    await quizSession.save();

    res.json({
      success: true,
      message: 'Quiz started successfully',
      sessionId: quizSession._id,
      quiz: {
        _id: quiz._id,
        title: quiz.title,
        timeMinutes: quiz.timeMinutes,
        totalQuestions: quiz.questions.length,
        questions: quiz.questions.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options
        }))
      }
    });

  } catch (error) {
    console.error('Start quiz error:', error);
    res.status(500).json({
      error: 'Failed to start quiz',
      message: error.message
    });
  }
};

// Submit single quiz answer
const submitQuizAnswer = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questionId, selectedAnswer } = req.body;
    const userId = req.user.userId;

    // Find active quiz session
    const session = await QuizResult.findOne({
      userId,
      quizId,
      completed: false
    });

    if (!session) {
      return res.status(404).json({
        error: 'No active quiz session found'
      });
    }

    // Update answer in session
    const existingAnswerIndex = session.answers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex >= 0) {
      session.answers[existingAnswerIndex].selectedAnswer = selectedAnswer;
    } else {
      session.answers.push({
        questionId,
        selectedAnswer
      });
    }

    await session.save();

    res.json({
      success: true,
      message: 'Answer saved successfully'
    });

  } catch (error) {
    console.error('Submit quiz answer error:', error);
    res.status(500).json({
      error: 'Failed to save answer',
      message: error.message
    });
  }
};

// Complete quiz and calculate results
const completeQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { timeSpent } = req.body;
    const userId = req.user.userId;

    // Find active quiz session
    const session = await QuizResult.findOne({
      userId,
      quizId,
      completed: false
    });

    if (!session) {
      return res.status(404).json({
        error: 'No active quiz session found'
      });
    }

    // Get quiz data for scoring
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        error: 'Quiz not found'
      });
    }

    // Calculate score
    let correctAnswers = 0;
    const detailedAnswers = [];

    quiz.questions.forEach((question) => {
      const userAnswer = session.answers.find(a => a.questionId === question.id);
      const isCorrect = userAnswer && userAnswer.selectedAnswer === question.correctAnswer;
      
      if (isCorrect) correctAnswers++;

      detailedAnswers.push({
        questionId: question.id,
        selectedAnswer: userAnswer ? userAnswer.selectedAnswer : null,
        isCorrect
      });
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    // Calculate points earned
    let pointsEarned = 0;
    if (passed) {
      pointsEarned = quiz.points;
      if (score >= 90) pointsEarned += 50;
      else if (score >= 80) pointsEarned += 25;
    }

    // Update session with final results
    session.answers = detailedAnswers;
    session.score = score;
    session.timeSpent = timeSpent || 0;
    session.passed = passed;
    session.pointsEarned = pointsEarned;
    session.completed = true;
    session.completedAt = new Date();

    await session.save();

    // Update user points if passed
    if (passed) {
      await User.findByIdAndUpdate(userId, {
        $inc: { points: pointsEarned }
      });

      await updateUserRank(userId);
      await checkBadgeEarned(userId, 'quiz_complete', {
        score,
        sdgId: quiz.sdgId
      });
    }

    res.json({
      success: true,
      message: passed ? 'Quiz completed successfully!' : 'Quiz completed, but you need to retake it to pass.',
      results: {
        score,
        passed,
        correctAnswers,
        totalQuestions: quiz.questions.length,
        pointsEarned,
        timeSpent
      }
    });

  } catch (error) {
    console.error('Complete quiz error:', error);
    res.status(500).json({
      error: 'Failed to complete quiz',
      message: error.message
    });
  }
};

// Get quiz results
const getQuizResults = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user.userId;

    const result = await QuizResult.findOne({
      userId,
      quizId,
      completed: true
    }).populate('quizId', 'title questions')
      .sort({ completedAt: -1 });

    if (!result) {
      return res.status(404).json({
        error: 'No quiz results found'
      });
    }

    const quiz = result.quizId;
    const detailedResults = {
      score: result.score,
      passed: result.passed,
      correctAnswers: result.answers.filter(a => a.isCorrect).length,
      totalQuestions: quiz.questions.length,
      pointsEarned: result.pointsEarned,
      timeSpent: result.timeSpent,
      completedAt: result.completedAt,
      questions: quiz.questions.map((q) => {
        const userAnswer = result.answers.find(a => a.questionId === q.id);
        return {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          selectedAnswer: userAnswer ? userAnswer.selectedAnswer : null,
          isCorrect: userAnswer ? userAnswer.isCorrect : false,
          explanation: q.explanation
        };
      })
    };

    res.json({
      success: true,
      results: detailedResults
    });

  } catch (error) {
    console.error('Get quiz results error:', error);
    res.status(500).json({
      error: 'Failed to get quiz results',
      message: error.message
    });
  }
};

// Retake quiz
const retakeQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user.userId;

    // Delete previous incomplete sessions
    await QuizResult.deleteMany({
      userId,
      quizId,
      completed: false
    });

    res.json({
      success: true,
      message: 'Ready to retake quiz'
    });

  } catch (error) {
    console.error('Retake quiz error:', error);
    res.status(500).json({
      error: 'Failed to prepare retake',
      message: error.message
    });
  }
};

// Get quiz statistics (admin only)
const getQuizStatistics = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        error: 'Quiz not found'
      });
    }

    // Get all completed quiz results
    const results = await QuizResult.find({
      quizId,
      completed: true
    });

    if (results.length === 0) {
      return res.json({
        success: true,
        statistics: {
          totalAttempts: 0,
          averageScore: 0,
          passRate: 0,
          totalParticipants: 0
        }
      });
    }

    const totalAttempts = results.length;
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    const averageScore = Math.round(totalScore / totalAttempts);
    const passedCount = results.filter(r => r.passed).length;
    const passRate = Math.round((passedCount / totalAttempts) * 100);
    const totalParticipants = new Set(results.map(r => r.userId.toString())).size;

    // Score distribution
    const scoreRanges = {
      '90-100': 0,
      '80-89': 0,
      '70-79': 0,
      '60-69': 0,
      '0-59': 0
    };

    results.forEach(result => {
      if (result.score >= 90) scoreRanges['90-100']++;
      else if (result.score >= 80) scoreRanges['80-89']++;
      else if (result.score >= 70) scoreRanges['70-79']++;
      else if (result.score >= 60) scoreRanges['60-69']++;
      else scoreRanges['0-59']++;
    });

    res.json({
      success: true,
      statistics: {
        totalAttempts,
        averageScore,
        passRate,
        totalParticipants,
        scoreDistribution: scoreRanges,
        quizInfo: {
          title: quiz.title,
          totalQuestions: quiz.questions.length,
          passingScore: quiz.passingScore
        }
      }
    });

  } catch (error) {
    console.error('Get quiz statistics error:', error);
    res.status(500).json({
      error: 'Failed to get quiz statistics',
      message: error.message
    });
  }
};

// Keep existing functions
const getQuizByModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user.userId;

    // Check if user completed the lesson first
    const progress = await Progress.findOne({
      userId,
      moduleId,
      completed: true
    });

    if (!progress) {
      return res.status(403).json({
        error: 'Please complete the lesson first before taking the quiz'
      });
    }

    // Get quiz data
    const quiz = await Quiz.findOne({
      moduleId,
      isActive: true
    });

    if (!quiz) {
      return res.status(404).json({
        error: 'Quiz not found for this lesson'
      });
    }

    // Check if user already completed this quiz
    const existingResult = await QuizResult.findOne({
      userId,
      quizId: quiz._id
    });

    // Return quiz data (without correct answers)
    const quizData = {
      _id: quiz._id,
      title: quiz.title,
      description: quiz.description,
      timeMinutes: quiz.timeMinutes,
      questions: quiz.questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
      })),
      totalQuestions: quiz.questions.length,
      passingScore: quiz.passingScore,
      points: quiz.points,
      alreadyCompleted: !!existingResult,
      previousScore: existingResult ? existingResult.score : null
    };

    res.json({
      success: true,
      quiz: quizData
    });

  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({
      error: 'Failed to get quiz',
      message: error.message
    });
  }
};

// Submit quiz answers (legacy function - kept for compatibility)
const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers, timeSpent } = req.body;
    const userId = req.user.userId;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        error: 'Invalid answers format'
      });
    }

    // Get quiz data
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        error: 'Quiz not found'
      });
    }

    // Calculate score
    let correctAnswers = 0;
    const detailedAnswers = [];

    quiz.questions.forEach((question, index) => {
      const userAnswer = answers.find(a => a.questionId === question.id);
      const isCorrect = userAnswer && userAnswer.selectedAnswer === question.correctAnswer;
      
      if (isCorrect) correctAnswers++;

      detailedAnswers.push({
        questionId: question.id,
        selectedAnswer: userAnswer ? userAnswer.selectedAnswer : null,
        isCorrect
      });
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    // Calculate points earned
    let pointsEarned = 0;
    if (passed) {
      pointsEarned = quiz.points;
      // Bonus points for high scores
      if (score >= 90) pointsEarned += 50;
      else if (score >= 80) pointsEarned += 25;
    }

    // Save quiz result
    const quizResult = new QuizResult({
      userId,
      quizId: quiz._id,
      moduleId: quiz.moduleId,
      sdgId: quiz.sdgId,
      answers: detailedAnswers,
      score,
      timeSpent: timeSpent || 0,
      passed,
      pointsEarned
    });

    await quizResult.save();

    // Update user points if passed
    if (passed) {
      await User.findByIdAndUpdate(userId, {
        $inc: { points: pointsEarned }
      });

      // Update user rank
      await updateUserRank(userId);

      // Check for badges
      await checkBadgeEarned(userId, 'quiz_complete', {
        score,
        sdgId: quiz.sdgId
      });
    }

    // Return detailed results
    const results = {
      score,
      passed,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      pointsEarned,
      timeSpent,
      questions: quiz.questions.map((q, index) => {
        const userAnswer = detailedAnswers.find(a => a.questionId === q.id);
        return {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          selectedAnswer: userAnswer.selectedAnswer,
          isCorrect: userAnswer.isCorrect,
          explanation: q.explanation
        };
      })
    };

    res.json({
      success: true,
      message: passed ? 'Quiz completed successfully!' : 'Quiz completed, but you need to retake it to pass.',
      results
    });

  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      error: 'Failed to submit quiz',
      message: error.message
    });
  }
};

// Get quiz results/history for user
const getQuizHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { sdgId, limit = 10, page = 1 } = req.query;

    const filter = { userId };
    if (sdgId) filter.sdgId = parseInt(sdgId);

    const skip = (page - 1) * limit;

    const results = await QuizResult.find(filter)
      .populate('quizId', 'title')
      .populate('moduleId', 'title')
      .sort({ completedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await QuizResult.countDocuments(filter);

    res.json({
      success: true,
      results: results.map(r => ({
        _id: r._id,
        quizTitle: r.quizId.title,
        moduleTitle: r.moduleId.title,
        sdgId: r.sdgId,
        score: r.score,
        passed: r.passed,
        pointsEarned: r.pointsEarned,
        completedAt: r.completedAt
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get quiz history error:', error);
    res.status(500).json({
      error: 'Failed to get quiz history',
      message: error.message
    });
  }
};

module.exports = {
  // New functions to match routes
  getQuizBySDG,
  getQuizByLesson,
  startQuiz,
  submitQuizAnswer,
  completeQuiz,
  getQuizResults,
  retakeQuiz,
  getQuizStatistics,
  
  // Existing functions
  getQuizByModule,
  submitQuiz,
  getQuizHistory
};