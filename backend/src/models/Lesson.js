const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  sdgId: {
    type: Number,
    required: true,
    min: 1,
    max: 17
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
  content: [{
    type: {
      type: String,
      required: true,
      enum: ['text', 'video', 'image']
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    data: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  }],
  videoUrl: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  objectives: [{
    type: String,
    trim: true
  }],
  prerequisites: [{
    type: String,
    trim: true
  }],
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  tags: [{
    type: String,
    trim: true
  }],
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
lessonSchema.index({ sdgId: 1 });
lessonSchema.index({ isActive: 1 });
lessonSchema.index({ difficulty: 1 });

// Static methods
lessonSchema.statics.getBySDGId = function(sdgId) {
  return this.findOne({ sdgId, isActive: true })
    .populate('createdBy', 'username')
    .sort({ createdAt: -1 });
};

lessonSchema.statics.getAll = function(filters = {}) {
  const query = { isActive: true };
  
  if (filters.sdgId) {
    query.sdgId = filters.sdgId;
  }
  
  if (filters.difficulty) {
    query.difficulty = filters.difficulty;
  }
  
  return this.find(query)
    .populate('createdBy', 'username')
    .sort({ sdgId: 1, createdAt: -1 });
};

lessonSchema.statics.create = function(lessonData) {
  return this.create(lessonData);
};

lessonSchema.statics.update = function(lessonId, updateData) {
  return this.findByIdAndUpdate(
    lessonId,
    { ...updateData, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
};

lessonSchema.statics.delete = function(lessonId) {
  return this.findByIdAndUpdate(
    lessonId,
    { isActive: false, updatedAt: new Date() },
    { new: true }
  );
};

module.exports = mongoose.model('Lesson', lessonSchema);