// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import models
const User = require('./src/models/User');
const State = require('./src/models/State');
const Experience = require('./src/models/Experience');
const Review = require('./src/models/Review');

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://travelbharat-frontend-am5f.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.use(express.json());

console.log('🟢 Starting server...');
console.log('🔑 JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('📊 MONGODB_URI exists:', !!process.env.MONGODB_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbharat_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`📊 Database: ${mongoose.connection.name}`);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});

// ============================================
// AUTH MIDDLEWARE
// ============================================
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Auth error:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const admin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

// ============================================
// AUTH ROUTES
// ============================================

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('📝 Register attempt:', { email, username });
    
    if (!email || !password || !username) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || 'user' },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );
    
    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, username, email, role: user.role || 'user' } 
    });
  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔑 Login attempt:', email);
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || 'user' },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );
    
    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, username: user.username, email: user.email, role: user.role || 'user' } 
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// STATE ROUTES
// ============================================

app.get('/api/states', async (req, res) => {
  try {
    const states = await State.find().sort({ name: 1 });
    res.json({ success: true, states });
  } catch (error) {
    console.error('❌ Error fetching states:', error);
    res.json({ success: false, states: [] });
  }
});

app.post('/api/states', auth, admin, async (req, res) => {
  try {
    const state = new State(req.body);
    await state.save();
    res.status(201).json({ success: true, state });
  } catch (error) {
    console.error('❌ Error creating state:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/states/:id', auth, admin, async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!state) {
      return res.status(404).json({ success: false, message: 'State not found' });
    }
    res.json({ success: true, state });
  } catch (error) {
    console.error('❌ Error updating state:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/states/:id', auth, admin, async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) {
      return res.status(404).json({ success: false, message: 'State not found' });
    }
    res.json({ success: true, message: 'State deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting state:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// EXPERIENCE ROUTES
// ============================================

app.get('/api/experiences', async (req, res) => {
  try {
    const { category, state, limit, popular } = req.query;
    let query = {};
    if (category) query.category = category;
    if (state) query.state = state;
    if (popular === 'true') query.isPopular = true;
    
    let experiencesQuery = Experience.find(query);
    if (limit) experiencesQuery = experiencesQuery.limit(parseInt(limit));
    
    const experiences = await experiencesQuery.sort({ createdAt: -1 });
    res.json({ success: true, experiences });
  } catch (error) {
    console.error('❌ Error fetching experiences:', error);
    res.json({ success: false, experiences: [] });
  }
});

app.get('/api/experiences/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, experience });
  } catch (error) {
    console.error('❌ Error fetching experience:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/experiences', auth, admin, async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json({ success: true, experience });
  } catch (error) {
    console.error('❌ Error creating experience:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/experiences/:id', auth, admin, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, experience });
  } catch (error) {
    console.error('❌ Error updating experience:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/experiences/:id', auth, admin, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    // Also delete all reviews for this experience
    await Review.deleteMany({ experienceId: req.params.id });
    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting experience:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// REVIEW ROUTES - COMPLETE
// ============================================

// GET all reviews for an experience
app.get('/api/experiences/:experienceId/reviews', async (req, res) => {
  try {
    const { experienceId } = req.params;
    console.log(`📊 GET reviews for experience: ${experienceId}`);

    // Check if experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    // Get reviews
    const reviews = await Review.find({ experienceId })
      .sort({ createdAt: -1 });

    // Calculate stats
    const total = reviews.length;
    const average = total > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total 
      : 0;

    // Rating distribution
    const ratingCounts = {};
    reviews.forEach(r => {
      const key = Math.round(r.rating);
      ratingCounts[key] = (ratingCounts[key] || 0) + 1;
    });

    console.log(`✅ Found ${total} reviews for experience ${experienceId}`);

    res.json({
      success: true,
      reviews: reviews,
      stats: {
        total: total,
        average: Math.round(average * 10) / 10,
        ratingCounts: ratingCounts
      }
    });
  } catch (error) {
    console.error('❌ Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
});

// POST create a new review
app.post('/api/experiences/:experienceId/reviews', async (req, res) => {
  try {
    const { experienceId } = req.params;
    const { rating, title, comment, pros, cons, visitDate, username, userId } = req.body;

    console.log(`📝 POST review for experience: ${experienceId}`);
    console.log('📝 Data:', { rating, title, comment: comment?.substring(0, 50) + '...' });

    // Validate
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating between 1 and 5 is required'
      });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Comment is required'
      });
    }

    // Check if experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    // Create review
    const review = new Review({
      experienceId,
      userId: userId || null,
      username: username || 'Anonymous',
      rating: parseInt(rating),
      title: title.trim(),
      comment: comment.trim(),
      pros: pros || [],
      cons: cons || [],
      visitDate: visitDate || null,
      isVerified: false,
      createdAt: new Date()
    });

    await review.save();
    console.log(`✅ Review created: ${review._id}`);

    // Update experience rating
    await updateExperienceRating(experienceId);

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review: review
    });
  } catch (error) {
    console.error('❌ Error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating review',
      error: error.message
    });
  }
});

// DELETE a review
app.delete('/api/reviews/:reviewId', auth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    console.log(`🗑️ DELETE review: ${reviewId}`);

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user owns the review or is admin
    if (review.userId && review.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own reviews'
      });
    }

    const experienceId = review.experienceId;
    await review.deleteOne();

    // Update experience rating
    await updateExperienceRating(experienceId);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
});

// ===== NEW: PATCH - Verify a review (Admin only) =====
app.patch('/api/reviews/:reviewId/verify', auth, admin, async (req, res) => {
  try {
    const { reviewId } = req.params;
    console.log(`✅ Verifying review: ${reviewId}`);

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Toggle verification status
    review.isVerified = !review.isVerified;
    await review.save();

    console.log(`✅ Review ${review.isVerified ? 'verified' : 'unverified'}: ${reviewId}`);
    res.json({
      success: true,
      message: `Review ${review.isVerified ? 'verified' : 'unverified'} successfully`,
      review
    });
  } catch (error) {
    console.error('❌ Error verifying review:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying review',
      error: error.message
    });
  }
});

// ===== NEW: POST - Mark review as helpful =====
app.post('/api/reviews/:reviewId/helpful', auth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user already marked as helpful
    const isHelpful = review.helpfulUsers && review.helpfulUsers.includes(userId);
    
    if (isHelpful) {
      // Remove helpful
      review.helpfulUsers = review.helpfulUsers.filter(id => id.toString() !== userId);
      review.helpfulCount = review.helpfulUsers.length;
    } else {
      // Add helpful
      if (!review.helpfulUsers) review.helpfulUsers = [];
      review.helpfulUsers.push(userId);
      review.helpfulCount = review.helpfulUsers.length;
    }

    await review.save();

    res.json({
      success: true,
      message: isHelpful ? 'Removed helpful mark' : 'Marked as helpful',
      helpfulCount: review.helpfulCount,
      isHelpful: !isHelpful
    });
  } catch (error) {
    console.error('❌ Error marking helpful:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking helpful',
      error: error.message
    });
  }
});

// ===== NEW: POST - Report a review =====
app.post('/api/reviews/:reviewId/report', auth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { reason } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.reported = true;
    review.reportReason = reason || 'No reason provided';
    await review.save();

    res.json({
      success: true,
      message: 'Review reported successfully'
    });
  } catch (error) {
    console.error('❌ Error reporting review:', error);
    res.status(500).json({
      success: false,
      message: 'Error reporting review',
      error: error.message
    });
  }
});

// ============================================
// HELPER: Update experience rating
// ============================================
async function updateExperienceRating(experienceId) {
  try {
    const reviews = await Review.find({ experienceId });
    const total = reviews.length;
    const average = total > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total 
      : 0;

    await Experience.findByIdAndUpdate(experienceId, {
      rating: Math.round(average * 10) / 10,
      reviewCount: total
    });

    console.log(`✅ Updated experience ${experienceId}: rating=${average.toFixed(1)}, count=${total}`);
  } catch (error) {
    console.error('❌ Error updating experience rating:', error);
  }
}

// ============================================
// TEST & HEALTH ROUTES
// ============================================

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    status: 'success',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: {
      jwt_secret_set: !!process.env.JWT_SECRET,
      mongodb_uri_set: !!process.env.MONGODB_URI
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    database: mongoose.connection.name || 'unknown'
  });
});

// ============================================
// ROOT ROUTE
// ============================================

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🌏 Welcome to TravelBharat API',
    version: '1.0.0',
    status: '🟢 Online',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      data: {
        states: 'GET /api/states',
        statesCrud: 'POST /api/states, PUT /api/states/:id, DELETE /api/states/:id',
        experiences: 'GET /api/experiences',
        experience: 'GET /api/experiences/:id',
        experiencesCrud: 'POST /api/experiences, PUT /api/experiences/:id, DELETE /api/experiences/:id'
      },
      reviews: {
        get: 'GET /api/experiences/:experienceId/reviews',
        create: 'POST /api/experiences/:experienceId/reviews',
        delete: 'DELETE /api/reviews/:reviewId',
        verify: 'PATCH /api/reviews/:reviewId/verify',
        helpful: 'POST /api/reviews/:reviewId/helpful',
        report: 'POST /api/reviews/:reviewId/report'
      },
      utilities: {
        test: 'GET /api/test',
        health: 'GET /api/health'
      }
    }
  });
});

// ============================================
// 404 HANDLER
// ============================================

app.use((req, res) => {
  console.log(`❌ 404: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`
  });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`✅ POST /api/auth/login`);
  console.log(`✅ POST /api/auth/register`);
  console.log(`✅ GET  /api/states`);
  console.log(`✅ POST /api/states (Admin)`);
  console.log(`✅ PUT  /api/states/:id (Admin)`);
  console.log(`✅ DELETE /api/states/:id (Admin)`);
  console.log(`✅ GET  /api/experiences`);
  console.log(`✅ GET  /api/experiences/:id`);
  console.log(`✅ POST /api/experiences (Admin)`);
  console.log(`✅ PUT  /api/experiences/:id (Admin)`);
  console.log(`✅ DELETE /api/experiences/:id (Admin)`);
  console.log(`✅ GET  /api/experiences/:experienceId/reviews`);
  console.log(`✅ POST /api/experiences/:experienceId/reviews`);
  console.log(`✅ DELETE /api/reviews/:reviewId`);
  console.log(`✅ PATCH /api/reviews/:reviewId/verify (Admin) ← NEW`);
  console.log(`✅ POST /api/reviews/:reviewId/helpful ← NEW`);
  console.log(`✅ POST /api/reviews/:reviewId/report ← NEW`);
  console.log(`✅ GET  /api/test`);
  console.log(`✅ GET  /api/health`);
  console.log(`✅ GET  /`);
  console.log(`\n✅ Ready for requests!\n`);
});

module.exports = app;
