const User = require('../models/User');
const Badge = require('../models/Badge');
const Notification = require('../models/Notification');
const Leaderboard = require('../models/Leaderboard');
const LessonProgress = require('../models/LessonProgress');
const QuizResult = require('../models/QuizResult');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const { POINTS } = require('./constants');

// Calculate points based on action
const calculatePoints = (action, data) => {
  switch (action) {
    case 'MODULE_COMPLETE':
      return POINTS.MODULE_COMPLETE;
    case 'LESSON_COMPLETE':
      return POINTS.LESSON_COMPLETE || 50; // 50 points for completing lesson
    case 'QUIZ_PASS':
      const basePoints = POINTS.QUIZ_PASS || 100;
      const scoreBonus = Math.floor((data.score - 70) / 5) * 10; // Bonus for high scores
      const timeBonus = data.timeBonus || 0;
      return basePoints + Math.max(0, scoreBonus) + timeBonus;
    case 'QUIZ_PERFECT':
      return POINTS.QUIZ_PERFECT || 200; // Perfect score bonus
    case 'CHALLENGE_COMPLETE':
      const challengeBasePoints = POINTS.CHALLENGE_COMPLETE;
      const challengeTimeBonus = data.timeBonus || 0;
      const challengeScoreBonus = data.scoreBonus || 0;
      return challengeBasePoints + challengeTimeBonus + challengeScoreBonus;
    case 'DAILY_STREAK':
      return POINTS.DAILY_STREAK * (data.streakDays || 1);
    case 'FIRST_LESSON':
      return POINTS.FIRST_LESSON || 25; // First lesson completion bonus
    case 'LESSON_STREAK':
      return POINTS.LESSON_STREAK || 15; // Consecutive lesson completion
    default:
      return 0;
  }
};

// Calculate lesson progress
const calculateLessonProgress = (sectionsCompleted, totalSections) => {
  if (!totalSections || totalSections === 0) return 0;
  if (!sectionsCompleted || sectionsCompleted.length === 0) return 0;
  
  const progress = (sectionsCompleted.length / totalSections) * 100;
  return Math.min(100, Math.max(0, Math.round(progress)));
};

// Check lesson prerequisites
const checkLessonPrerequisites = async (userId, lessonId) => {
  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson || !lesson.prerequisites || lesson.prerequisites.length === 0) {
      return true; // No prerequisites
    }

    // Check if user has completed prerequisite lessons/modules
    for (const prerequisite of lesson.prerequisites) {
      const progress = await LessonProgress.findOne({
        userId: userId,
        lessonId: prerequisite,
        completed: true
      });
      
      if (!progress) {
        return false; // Prerequisite not met
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error checking lesson prerequisites:', error);
    return false;
  }
};

// Update lesson streak
const updateLessonStreak = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if user completed a lesson today
    const todayLessons = await LessonProgress.countDocuments({
      userId: userId,
      completedAt: { $gte: today },
      completed: true
    });

    if (todayLessons === 0) return user.streak; // No lesson completed today

    // Check if user completed lesson yesterday
    const yesterdayLessons = await LessonProgress.countDocuments({
      userId: userId,
      completedAt: { 
        $gte: yesterday,
        $lt: today
      },
      completed: true
    });

    let newStreak = 1;
    
    if (yesterdayLessons > 0 && user.lastLessonDate) {
      const lastLessonDate = new Date(user.lastLessonDate);
      lastLessonDate.setHours(0, 0, 0, 0);
      
      if (lastLessonDate.getTime() === yesterday.getTime()) {
        newStreak = user.streak + 1;
      }
    }

    await User.findByIdAndUpdate(userId, {
      streak: newStreak,
      lastLessonDate: new Date()
    });

    return newStreak;
  } catch (error) {
    console.error('Error updating lesson streak:', error);
    return 0;
  }
};

// Calculate quiz score with detailed analysis
const calculateQuizScore = (answers, questions) => {
  if (!answers || !questions || questions.length === 0) {
    return { score: 0, totalPoints: 0, correctAnswers: 0, maxPoints: 0 };
  }

  let correctAnswers = 0;
  let totalPoints = 0;
  let maxPoints = 0;

  questions.forEach((question, index) => {
    const userAnswer = answers[index];
    const correctAnswer = question.correctAnswer;
    const points = question.points || 10;

    maxPoints += points;

    if (userAnswer && userAnswer.toString().toLowerCase() === correctAnswer.toString().toLowerCase()) {
      correctAnswers++;
      totalPoints += points;
    }
  });

  const score = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

  return {
    score,
    totalPoints,
    correctAnswers,
    maxPoints,
    totalQuestions: questions.length
  };
};

// Check quiz eligibility
const checkQuizEligibility = async (userId, quizId) => {
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return { canAttempt: false, reason: 'Quiz not found' };
    }

    if (!quiz.isActive) {
      return { canAttempt: false, reason: 'Quiz is not active' };
    }

    // Check if lesson prerequisite is completed
    if (quiz.lessonId) {
      const lessonProgress = await LessonProgress.findOne({
        userId: userId,
        lessonId: quiz.lessonId,
        completed: true
      });
      
      if (!lessonProgress) {
        return { 
          canAttempt: false, 
          reason: 'Complete the lesson first',
          requiresLesson: true
        };
      }
    }

    // Check attempt limits
    if (quiz.maxAttempts && quiz.maxAttempts > 0) {
      const attemptCount = await QuizResult.countDocuments({
        userId: userId,
        quizId: quizId
      });

      if (attemptCount >= quiz.maxAttempts) {
        return { 
          canAttempt: false, 
          reason: 'Maximum attempts reached',
          attemptsUsed: attemptCount,
          maxAttempts: quiz.maxAttempts
        };
      }

      return {
        canAttempt: true,
        remainingAttempts: quiz.maxAttempts - attemptCount,
        attemptsUsed: attemptCount,
        maxAttempts: quiz.maxAttempts
      };
    }

    return { canAttempt: true };
  } catch (error) {
    console.error('Error checking quiz eligibility:', error);
    return { canAttempt: false, reason: 'Error checking eligibility' };
  }
};

// Generate quiz certificate data
const generateQuizCertificate = async (userId, quizId, score) => {
  try {
    const user = await User.findById(userId);
    const quiz = await Quiz.findById(quizId).populate('lessonId');
    
    if (!user || !quiz) return null;

    const certificateData = {
      userId: userId,
      userName: user.name,
      userEmail: user.email,
      quizId: quizId,
      quizTitle: quiz.title,
      lessonTitle: quiz.lessonId ? quiz.lessonId.title : 'General Quiz',
      sdgId: quiz.sdgId,
      score: score,
      passingScore: quiz.passingScore,
      completedAt: new Date(),
      certificateId: `CERT-${userId.toString().slice(-6)}-${quizId.toString().slice(-6)}-${Date.now()}`,
      isValid: score >= quiz.passingScore
    };

    return certificateData;
  } catch (error) {
    console.error('Error generating quiz certificate:', error);
    return null;
  }
};

// Update user rank in leaderboard
const updateUserRank = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    // Update current period leaderboard
    const currentWeek = Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // Update weekly leaderboard
    await Leaderboard.findOneAndUpdate(
      { 
        userId: userId, 
        period: 'weekly',
        week: currentWeek,
        year: currentYear
      },
      {
        userId: userId,
        points: user.points,
        period: 'weekly',
        week: currentWeek,
        month: currentMonth,
        year: currentYear,
        updatedAt: new Date()
      },
      { upsert: true }
    );

    // Update monthly leaderboard
    await Leaderboard.findOneAndUpdate(
      { 
        userId: userId, 
        period: 'monthly',
        month: currentMonth,
        year: currentYear
      },
      {
        userId: userId,
        points: user.points,
        period: 'monthly',
        week: currentWeek,
        month: currentMonth,
        year: currentYear,
        updatedAt: new Date()
      },
      { upsert: true }
    );

    // Update all-time leaderboard
    await Leaderboard.findOneAndUpdate(
      { 
        userId: userId, 
        period: 'alltime'
      },
      {
        userId: userId,
        points: user.points,
        period: 'alltime',
        week: currentWeek,
        month: currentMonth,
        year: currentYear,
        updatedAt: new Date()
      },
      { upsert: true }
    );

    // Calculate and update rank
    const higherRankedCount = await User.countDocuments({
      points: { $gt: user.points }
    });
    
    await User.findByIdAndUpdate(userId, {
      rank: higherRankedCount + 1
    });

  } catch (error) {
    console.error('Error updating user rank:', error);
  }
};

// Check if user earned a badge (updated for lesson & quiz)
const checkBadgeEarned = async (userId, action, data = {}) => {
  try {
    const user = await User.findById(userId);
    if (!user) return [];

    const badges = await Badge.find();
    const earnedBadges = [];

    for (const badge of badges) {
      // Skip if user already has this badge
      if (user.badges.includes(badge._id)) continue;

      let qualified = false;

      switch (badge.requirements.type) {
        case 'modules_completed':
          const moduleCount = await require('../models/Progress').countDocuments({
            userId: userId,
            completed: true
          });
          qualified = moduleCount >= badge.requirements.target;
          break;

        case 'lessons_completed':
          const lessonCount = await LessonProgress.countDocuments({
            userId: userId,
            completed: true
          });
          qualified = lessonCount >= badge.requirements.target;
          break;

        case 'quizzes_passed':
          const quizPassCount = await QuizResult.countDocuments({
            userId: userId,
            passed: true
          });
          qualified = quizPassCount >= badge.requirements.target;
          break;

        case 'perfect_scores':
          const perfectScoreCount = await QuizResult.countDocuments({
            userId: userId,
            score: 100
          });
          qualified = perfectScoreCount >= badge.requirements.target;
          break;

        case 'points_earned':
          qualified = user.points >= badge.requirements.target;
          break;

        case 'streak_days':
          qualified = user.streak >= badge.requirements.target;
          break;

        case 'sdg_expert':
          // Check if user completed all lessons and quizzes for specific SDG
          if (badge.requirements.sdgId) {
            const sdgLessons = await LessonProgress.countDocuments({
              userId: userId,
              sdgId: badge.requirements.sdgId,
              completed: true
            });
            const sdgQuizzes = await QuizResult.countDocuments({
              userId: userId,
              sdgId: badge.requirements.sdgId,
              passed: true
            });
            qualified = sdgLessons >= badge.requirements.lessonsRequired && 
                       sdgQuizzes >= badge.requirements.quizzesRequired;
          }
          break;

        case 'challenges_completed':
          // You'd need to track this in a separate collection or user field
          qualified = false; // Placeholder
          break;
      }

      if (qualified) {
        // Add badge to user
        await User.findByIdAndUpdate(userId, {
          $addToSet: { badges: badge._id },
          $inc: { points: badge.points }
        });

        earnedBadges.push(badge);

        // Generate notification
        await generateNotification(userId, 'badge', {
          badgeId: badge._id,
          badgeTitle: badge.title,
          points: badge.points
        });
      }
    }

    // Update leaderboard after earning badges
    if (earnedBadges.length > 0) {
      await updateUserRank(userId);
    }

    return earnedBadges;
  } catch (error) {
    console.error('Error checking badge earned:', error);
    return [];
  }
};

// Generate notification (updated for lesson & quiz)
const generateNotification = async (userId, type, data) => {
  try {
    let title, message;

    switch (type) {
      case 'badge':
        title = 'Badge Earned!';
        message = `Congratulations! You earned the "${data.badgeTitle}" badge and gained ${data.points} points!`;
        break;

      case 'lesson_complete':
        title = 'Lesson Completed!';
        message = `Great job completing "${data.lessonTitle}"! You earned ${data.points} points.`;
        break;

      case 'quiz_pass':
        title = 'Quiz Passed!';
        message = `Excellent! You passed "${data.quizTitle}" with ${data.score}% and earned ${data.points} points!`;
        break;

      case 'quiz_fail':
        title = 'Quiz Attempt';
        message = `You scored ${data.score}% on "${data.quizTitle}". ${data.remainingAttempts > 0 ? `You have ${data.remainingAttempts} attempts remaining.` : 'You can review the lesson and try again.'}`;
        break;

      case 'perfect_score':
        title = 'Perfect Score!';
        message = `Outstanding! You got 100% on "${data.quizTitle}" and earned a bonus ${data.bonusPoints} points!`;
        break;

      case 'streak_milestone':
        title = 'Streak Milestone!';
        message = `Amazing! You've maintained a ${data.streakDays}-day learning streak!`;
        break;

      case 'challenge':
        title = 'Challenge Completed!';
        message = `Great job completing the challenge! You earned ${data.points} points.`;
        break;

      case 'reminder':
        title = 'Learning Reminder';
        message = data.message || 'Don\'t forget to continue your learning journey today!';
        break;

      case 'achievement':
        title = 'Achievement Unlocked!';
        message = data.message || 'You\'ve reached a new milestone!';
        break;

      default:
        title = 'Notification';
        message = data.message || 'You have a new notification.';
    }

    const notification = new Notification({
      userId,
      title,
      message,
      type,
      isRead: false,
      data,
      createdAt: new Date()
    });

    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error generating notification:', error);
    return null;
  }
};

// Generate random daily challenge
const generateDailyChallenge = async () => {
  try {
    const challenges = await require('../models/Challenge').find({
      type: 'daily',
      isActive: true
    });

    if (challenges.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * challenges.length);
    return challenges[randomIndex];
  } catch (error) {
    console.error('Error generating daily challenge:', error);
    return null;
  }
};

// Format duration (minutes to readable format)
const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};

// Format quiz time remaining
const formatTimeRemaining = (seconds) => {
  if (seconds <= 0) return '00:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Get learning statistics for user
const getLearningStats = async (userId) => {
  try {
    const [
      totalLessons,
      completedLessons,
      totalQuizzes,
      passedQuizzes,
      averageScore,
      totalTimeSpent
    ] = await Promise.all([
      LessonProgress.countDocuments({ userId }),
      LessonProgress.countDocuments({ userId, completed: true }),
      QuizResult.countDocuments({ userId }),
      QuizResult.countDocuments({ userId, passed: true }),
      QuizResult.aggregate([
        { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
        { $group: { _id: null, avgScore: { $avg: '$score' } } }
      ]),
      LessonProgress.aggregate([
        { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
        { $group: { _id: null, totalTime: { $sum: '$timeSpent' } } }
      ])
    ]);

    return {
      lessons: {
        total: totalLessons,
        completed: completedLessons,
        completionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      },
      quizzes: {
        total: totalQuizzes,
        passed: passedQuizzes,
        passRate: totalQuizzes > 0 ? Math.round((passedQuizzes / totalQuizzes) * 100) : 0
      },
      averageScore: averageScore.length > 0 ? Math.round(averageScore[0].avgScore) : 0,
      totalTimeSpent: totalTimeSpent.length > 0 ? totalTimeSpent[0].totalTime : 0
    };
  } catch (error) {
    console.error('Error getting learning stats:', error);
    return null;
  }
};

module.exports = {
  calculatePoints,
  calculateLessonProgress,
  checkLessonPrerequisites,
  updateLessonStreak,
  calculateQuizScore,
  checkQuizEligibility,
  generateQuizCertificate,
  updateUserRank,
  checkBadgeEarned,
  generateNotification,
  generateDailyChallenge,
  formatDuration,
  formatTimeRemaining,
  getLearningStats
};