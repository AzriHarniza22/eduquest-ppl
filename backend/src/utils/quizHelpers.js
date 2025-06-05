// Utility functions specifically for quiz operations

// Shuffle array elements randomly
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Format quiz question for display
const formatQuizQuestion = (question, shuffleOptions = false) => {
  const formattedQuestion = {
    _id: question._id,
    question: question.question,
    type: question.type,
    order: question.order,
    points: question.points
  };

  // Handle options for multiple choice questions
  if (question.type === 'multiple_choice' && question.options) {
    formattedQuestion.options = shuffleOptions ? 
      shuffleArray(question.options) : 
      question.options;
  }

  // For true/false questions, ensure options are consistent
  if (question.type === 'true_false') {
    formattedQuestion.options = ['True', 'False'];
  }

  return formattedQuestion;
};

// Calculate remaining time for quiz
const calculateTimeRemaining = (startTime, timeLimit) => {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000); // in seconds
  const totalTimeInSeconds = timeLimit * 60; // convert minutes to seconds
  const remainingSeconds = Math.max(0, totalTimeInSeconds - elapsedTime);
  
  return remainingSeconds;
};

// Validate quiz answers before processing
const validateQuizAnswers = (answers, questions) => {
  const errors = [];
  
  // Check if answers array exists
  if (!Array.isArray(answers)) {
    return { valid: false, errors: ['Answers must be an array'] };
  }

  // Check if all questions are answered
  const questionIds = questions.map(q => q._id.toString());
  const answeredQuestionIds = answers.map(a => a.questionId.toString());
  
  const unansweredQuestions = questionIds.filter(qId => 
    !answeredQuestionIds.includes(qId)
  );
  
  if (unansweredQuestions.length > 0) {
    errors.push(`Missing answers for ${unansweredQuestions.length} question(s)`);
  }

  // Check for duplicate answers
  const duplicateAnswers = answeredQuestionIds.filter((id, index) => 
    answeredQuestionIds.indexOf(id) !== index
  );
  
  if (duplicateAnswers.length > 0) {
    errors.push('Duplicate answers found');
  }

  // Validate each answer
  answers.forEach((answer, index) => {
    if (!answer.questionId) {
      errors.push(`Answer ${index + 1}: Question ID is required`);
    }
    
    if (answer.answer === undefined || answer.answer === null || answer.answer === '') {
      errors.push(`Answer ${index + 1}: Answer value is required`);
    }

    // Check if question exists
    const question = questions.find(q => q._id.toString() === answer.questionId.toString());
    if (!question) {
      errors.push(`Answer ${index + 1}: Question not found`);
    } else {
      // Validate answer format based on question type
      if (question.type === 'multiple_choice' && question.options) {
        if (!question.options.includes(answer.answer)) {
          errors.push(`Answer ${index + 1}: Invalid option selected`);
        }
      }
      
      if (question.type === 'true_false') {
        if (!['True', 'False'].includes(answer.answer)) {
          errors.push(`Answer ${index + 1}: Must be True or False`);
        }
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};

// Generate detailed quiz report
const generateQuizReport = (quizResult) => {
  const report = {
    basic: {
      score: quizResult.score,
      passed: quizResult.passed,
      totalPoints: quizResult.totalPoints,
      maxPoints: quizResult.maxPoints,
      attempt: quizResult.attempt,
      timeSpent: quizResult.timeSpent,
      completedAt: quizResult.completedAt
    },
    detailed: {
      totalQuestions: quizResult.answers.length,
      correctAnswers: quizResult.answers.filter(a => a.isCorrect).length,
      incorrectAnswers: quizResult.answers.filter(a => !a.isCorrect).length,
      accuracy: quizResult.answers.length > 0 ? 
        Math.round((quizResult.answers.filter(a => a.isCorrect).length / quizResult.answers.length) * 100) : 0
    },
    performance: {
      grade: getGradeFromScore(quizResult.score),
      level: getPerformanceLevel(quizResult.score),
      recommendations: generateRecommendations(quizResult.score, quizResult.passed)
    },
    answers: quizResult.answers.map(answer => ({
      questionId: answer.questionId,
      userAnswer: answer.userAnswer,
      correctAnswer: answer.correctAnswer,
      isCorrect: answer.isCorrect,
      points: answer.points
    }))
  };

  return report;
};

// Get letter grade from score
const getGradeFromScore = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

// Get performance level description
const getPerformanceLevel = (score) => {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Satisfactory';
  if (score >= 60) return 'Needs Improvement';
  return 'Poor';
};

// Generate recommendations based on performance
const generateRecommendations = (score, passed) => {
  const recommendations = [];
  
  if (!passed) {
    recommendations.push('Review the lesson material before retaking the quiz');
    recommendations.push('Focus on areas where you got questions wrong');
  }
  
  if (score < 70) {
    recommendations.push('Consider reviewing the fundamental concepts');
    recommendations.push('Take notes while studying the lesson');
  }
  
  if (score >= 70 && score < 90) {
    recommendations.push('Good work! Review specific topics for better understanding');
    recommendations.push('Try to improve accuracy on detail-oriented questions');
  }
  
  if (score >= 90) {
    recommendations.push('Excellent performance! You have mastered this topic');
    recommendations.push('Consider helping others or exploring advanced topics');
  }

  return recommendations;
};

// Determine quiz difficulty based on questions
const getQuizDifficulty = (questions) => {
  if (!questions || questions.length === 0) {
    return 'unknown';
  }

  // Simple heuristic based on question types and options
  let complexityScore = 0;
  
  questions.forEach(question => {
    // Base complexity
    if (question.type === 'essay') {
      complexityScore += 3;
    } else if (question.type === 'multiple_choice') {
      complexityScore += 2;
    } else if (question.type === 'true_false') {
      complexityScore += 1;
    }
    
    // Additional complexity for multiple choice with many options
    if (question.type === 'multiple_choice' && question.options && question.options.length > 4) {
      complexityScore += 1;
    }
  });

  const averageComplexity = complexityScore / questions.length;
  
  if (averageComplexity >= 2.5) return 'advanced';
  if (averageComplexity >= 1.5) return 'intermediate';
  return 'beginner';
};

// Format time in MM:SS format
const formatTimeRemaining = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Generate random question selection from a pool
const getRandomQuestions = (questions, count) => {
  if (questions.length <= count) {
    return questions;
  }
  
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
};

// Calculate quiz statistics for analytics
const calculateQuizStatistics = (results) => {
  if (!results || results.length === 0) {
    return {
      totalAttempts: 0,
      averageScore: 0,
      passRate: 0,
      highestScore: 0,
      lowestScore: 0,
      completionRate: 0
    };
  }

  const scores = results.map(r => r.score);
  const passedResults = results.filter(r => r.passed);
  
  return {
    totalAttempts: results.length,
    averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    passRate: Math.round((passedResults.length / results.length) * 100),
    highestScore: Math.max(...scores),
    lowestScore: Math.min(...scores),
    completionRate: 100 // Assuming all results are completed
  };
};

module.exports = {
  shuffleArray,
  formatQuizQuestion,
  calculateTimeRemaining,
  validateQuizAnswers,
  generateQuizReport,
  getGradeFromScore,
  getPerformanceLevel,
  generateRecommendations,
  getQuizDifficulty,
  formatTimeRemaining,
  getRandomQuestions,
  calculateQuizStatistics
};