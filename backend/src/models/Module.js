// models/Module.js - UPDATE
const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true // Markdown or HTML content
  },
  sdgId: {
    type: Number,
    required: true,
    min: 1,
    max: 17
  },
  duration: {
    type: String,
    required: true // e.g., "15 minutes", "1 hour"
  },
  videoUrl: {
    type: String,
    default: null // YouTube iframe src
  },
  topics: [{
    type: String,
    trim: true
  }],
  order: {
    type: Number,
    required: true,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index untuk performa query
moduleSchema.index({ sdgId: 1, order: 1 });
moduleSchema.index({ isActive: 1 });

// Update timestamp otomatis
moduleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Module', moduleSchema);