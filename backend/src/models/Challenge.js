const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  explanation: {
    type: String,
    required: true
  }
});

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Challenge title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Challenge description is required']
  },
  sdgNumber: {
    type: Number,
    required: [true, 'SDG number is required'],
    min: 1,
    max: 17
  },
  questions: [questionSchema],
  timeMinutes: {
    type: Number,
    required: [true, 'Time limit is required'],
    min: 1
  },
  points: {
    type: Number,
    required: [true, 'Points is required'],
    min: 1
  },
  bonus: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ['daily', 'weekly', 'special'],
    default: 'daily'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Challenge', challengeSchema);