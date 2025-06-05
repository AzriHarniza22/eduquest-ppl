const mongoose = require('mongoose');

const lessonProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  sdgId: {
    type: Number,
    required: true,
    min: 1,
    max: 17
  },
  progress: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0
  },
  sectionsCompleted: [{
    type: Number,
    min: 0
  }],
  timeSpent: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  lastSection: {
    type: Number,
    min: 0,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
lessonProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });
lessonProgressSchema.index({ lessonId: 1 });
lessonProgressSchema.index({ sdgId: 1 });
lessonProgressSchema.index({ completed: 1 });

// Static methods
lessonProgressSchema.statics.getByUserId = function(userId, filters = {}) {
  const query = { userId };
  
  if (filters.sdgId) {
    query.sdgId = filters.sdgId;
  }
  
  if (filters.completed !== undefined) {
    query.completed = filters.completed;
  }
  
  return this.find(query)
    .populate('lessonId', 'title difficulty duration')
    .sort({ lastAccessedAt: -1 });
};

lessonProgressSchema.statics.getByLessonId = function(lessonId, userId) {
  return this.findOne({ lessonId, userId })
    .populate('userId', 'username')
    .populate('lessonId', 'title');
};

lessonProgressSchema.statics.create = function(progressData) {
  return this.create(progressData);
};

lessonProgressSchema.statics.updateProgress = function(userId, lessonId, updateData) {
  return this.findOneAndUpdate(
    { userId, lessonId },
    { 
      ...updateData, 
      lastAccessedAt: new Date(),
      updatedAt: new Date()
    },
    { 
      new: true, 
      upsert: true,
      runValidators: true
    }
  );
};

lessonProgressSchema.statics.markComplete = function(userId, lessonId) {
  return this.findOneAndUpdate(
    { userId, lessonId },
    { 
      completed: true,
      progress: 100,
      completedAt: new Date(),
      lastAccessedAt: new Date(),
      updatedAt: new Date()
    },
    { 
      new: true,
      runValidators: true
    }
  );
};

lessonProgressSchema.statics.getStatistics = function(lessonId) {
  return this.aggregate([
    { $match: { lessonId: mongoose.Types.ObjectId(lessonId) } },
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        completedUsers: {
          $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
        },
        avgProgress: { $avg: '$progress' },
        avgTimeSpent: { $avg: '$timeSpent' },
        maxTimeSpent: { $max: '$timeSpent' },
        minTimeSpent: { $min: '$timeSpent' }
      }
    },
    {
      $addFields: {
        completionRate: {
          $multiply: [
            { $divide: ['$completedUsers', '$totalUsers'] },
            100
          ]
        }
      }
    }
  ]);
};

module.exports = mongoose.model('LessonProgress', lessonProgressSchema);