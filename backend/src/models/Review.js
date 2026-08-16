// backend/src/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  experienceId: {  // Changed from destinationId
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userImage: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: true,
    maxlength: 2000
  },
  pros: {
    type: [String],
    default: []
  },
  cons: {
    type: [String],
    default: []
  },
  helpfulCount: {
    type: Number,
    default: 0
  },
  helpfulUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reported: {
    type: Boolean,
    default: false
  },
  reportReason: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  images: [{
    type: String,
    default: []
  }],
  visitDate: {
    type: Date,
    default: null
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

// Update experience rating
reviewSchema.statics.updateExperienceRating = async function(experienceId) {
  try {
    const result = await this.aggregate([
      { $match: { experienceId: new mongoose.Types.ObjectId(experienceId) } },
      { $group: { 
        _id: '$experienceId',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }}
    ]);

    if (result.length > 0) {
      const Experience = mongoose.model('Experience');
      await Experience.findByIdAndUpdate(experienceId, {
        rating: Math.round(result[0].averageRating * 10) / 10,
        reviewCount: result[0].totalReviews
      });
    }
  } catch (error) {
    console.error('Error updating experience rating:', error);
  }
};

// Indexes
reviewSchema.index({ experienceId: 1, createdAt: -1 });
reviewSchema.index({ userId: 1 });
reviewSchema.index({ rating: 1 });

module.exports = mongoose.model('Review', reviewSchema);