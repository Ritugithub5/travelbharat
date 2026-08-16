// backend/src/models/Experience.js
const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Wildlife', 'Bird Watching', 'Eco Tourism', 'Art Gallery',
      'Spiritual', 'Wellness', 'Culinary', 'Luxury Travel',
      'Water & Mountain', 'Heritage', 'Nature', 'Adventure',
      'Religious', 'Beach', 'Hill Station'
    ]
  },
  description: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: 'India'
  },
  city: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  bestTimeToVisit: {
    type: String,
    default: ''
  },
  entryFee: {
    type: String,
    default: 'Free'
  },
  timings: {
    type: String,
    default: 'Open all days'
  },
  highlights: [{
    type: String
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  howToReach: {
    type: Object,
    default: {}
  },
  emergencyContacts: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for search
experienceSchema.index({ name: 'text', description: 'text' });
experienceSchema.index({ category: 1 });
experienceSchema.index({ state: 1 });

module.exports = mongoose.model('Experience', experienceSchema);