const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  sdgId: {
    type: Number,
    required: true,
    min: 1,
    max: 17
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    userAnswer: {
      type: String,
      required: true,
      trim: true
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    },
    points: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  totalPoints: {
    type: Number,
    required: true,
    min: 0
  },
  maxPoints: {
    type: Number,
    required: true,
    min: 0
  },
  timeSpent: {
    type: Number,
    required: true,
    min: 0
  },
  passed: {
    type: Boolean,
    required: true
  },
  attempt: {
    type: Number,
    required: true,
    min: 1
  },
  startedAt: {
    type: Date,
    required: true
  },
  completedAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Indexes
quizResultSchema.index({ userId: 1, quizId: 1 });
quizResultSchema.index({ quizId: 1 });
quizResultSchema.index({ sdgId: 1 });
quizResultSchema.index({ passed: 1 });

// Static methods
quizResultSchema.statics.getByUserId = function(userId, filters = {}) {
  const query = { userId };
  
  if (filters.sdgId) {
    query.sdgId = filters.sdgId;
  }
  
  if (filters.passed !== undefined) {
    query.passed = filters.passed;
  }
  
  return this.find(query)
    .populate('quizId', 'title')
    .populate('lessonId', 'title')
    .sort({ createdAt: -1 });
};

quizResultSchema.statics.getByQuizId = function(quizId, filters = {}) {
  const query = { quizId };
  
  if (filters.passed !== undefined) {
    query.passed = filters.passed;
  }
  
  return this.find(query)
    .populate('userId', 'username email')
    .sort({ createdAt: -1 });
};

quizResultSchema.statics.create = function(resultData) {
  return this.create(resultData);
};

quizResultSchema.statics.getBestScore = function(userId, quizId) {
  return this.findOne({ userId, quizId })
    .sort({ score: -1, createdAt: -1 });
};

quizResultSchema.statics.getAttemptCount = function(userId, quizId) {
  return this.countDocuments({ userId, quizId });
};

quizResultSchema.statics.getStatistics = function(quizId) {
  return this.aggregate([
    { $match: { quizId: mongoose.Types.ObjectId(quizId) } },
    {
      $group: {
        _id: null,
        totalAttempts: { $sum: 1 },
        avgScore: { $avg: '$score' },
        passedCount: {
          $sum: { $cond: [{ $eq: ['$passed', true] }, 1, 0] }
        },
        maxScore: { $max: '$score' },
        minScore: { $min: '$score' },
        avgTimeSpent: { $avg: '$timeSpent' }
      }
    },
    {
      $addFields: {
        passRate: {
          $multiply: [
            { $divide: ['$passedCount', '$totalAttempts'] },
            100
          ]
        }
      }
    }
  ]);
};

module.exports = mongoose.model('QuizResult', quizResultSchema);