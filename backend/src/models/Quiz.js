const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  questions: [{
    question: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['multiple_choice', 'true_false', 'essay']
    },
    options: [{
      type: String,
      trim: true
    }],
    correctAnswer: {
      type: String,
      required: true,
      trim: true
    },
    explanation: {
      type: String,
      trim: true
    },
    points: {
      type: Number,
      required: true,
      min: 1,
      default: 10
    },
    order: {
      type: Number,
      required: true
    }
  }],
  timeLimit: {
    type: Number,
    required: true,
    min: 1
  },
  passingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 70
  },
  maxAttempts: {
    type: Number,
    required: true,
    min: 1,
    default: 3
  },
  shuffleQuestions: {
    type: Boolean,
    default: true
  },
  shuffleOptions: {
    type: Boolean,
    default: true
  },
  showResultsImmediately: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes
quizSchema.index({ sdgId: 1 });
quizSchema.index({ lessonId: 1 });
quizSchema.index({ isActive: 1 });

// Static methods
quizSchema.statics.getBySDGId = function(sdgId) {
  return this.findOne({ sdgId, isActive: true })
    .populate('lessonId')
    .populate('createdBy', 'username')
    .sort({ createdAt: -1 });
};

quizSchema.statics.getByLessonId = function(lessonId) {
  return this.findOne({ lessonId, isActive: true })
    .populate('lessonId')
    .populate('createdBy', 'username');
};

quizSchema.statics.create = function(quizData) {
  return this.create(quizData);
};

quizSchema.statics.update = function(quizId, updateData) {
  return this.findByIdAndUpdate(
    quizId,
    { ...updateData, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
};

quizSchema.statics.delete = function(quizId) {
  return this.findByIdAndUpdate(
    quizId,
    { isActive: false, updatedAt: new Date() },
    { new: true }
  );
};

quizSchema.statics.getRandomQuestions = function(quizId, count) {
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(quizId), isActive: true } },
    { $unwind: '$questions' },
    { $sample: { size: count } },
    { $replaceRoot: { newRoot: '$questions' } }
  ]);
};

module.exports = mongoose.model('Quiz', quizSchema);