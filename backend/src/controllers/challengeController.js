const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { checkBadgeEarned } = require('../utils/helpers');

const getChallenges = async (req, res) => {
  try {
    const { sdg, type } = req.query;
    
    let query = { isActive: true };
    if (sdg) query.sdgNumber = parseInt(sdg);
    if (type) query.type = type;

    const challenges = await Challenge.find(query).select('-questions.correctAnswer -questions.explanation');

    res.json(challenges);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const getChallengeById = async (req, res) => {
  try {
    const { challengeId } = req.params;

    const challenge = await Challenge.findById(challengeId).select('-questions.correctAnswer -questions.explanation');
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    res.json({
      challenge: {
        id: challenge._id,
        title: challenge.title,
        description: challenge.description,
        sdgNumber: challenge.sdgNumber,
        timeMinutes: challenge.timeMinutes,
        points: challenge.points,
        type: challenge.type
      },
      questions: challenge.questions.map(q => ({
        question: q.question,
        options: q.options
      }))
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const completeChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { answers, timeSpent } = req.body;
    const userId = req.user.userId;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    challenge.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / challenge.questions.length) * 100);
    const points = Math.round((score / 100) * challenge.points);

    // Update user points
    const user = await User.findById(userId);
    user.points += points;
    await user.save();

    // Check for badge achievements
    const badges = await checkBadgeEarned(userId, 'challenge_complete');

    res.json({
      message: 'Challenge completed successfully',
      score,
      points,
      badges
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const getDailyChallenge = async (req, res) => {
  try {
    const userId = req.user.userId;

    const challenge = await Challenge.findOne({ 
      type: 'daily', 
      isActive: true 
    }).select('-questions.correctAnswer -questions.explanation');

    const user = await User.findById(userId);

    res.json({
      challenge,
      streak: user.streak
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = { getChallenges, getChallengeById, completeChallenge, getDailyChallenge };