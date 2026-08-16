// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbharat_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/states', require('./src/routes/stateRoutes'));
app.use('/api/experiences', require('./src/routes/experienceRoutes'));
app.use('/api/reviews', require('./src/routes/reviewRoutes'));
app.use('/api/contact', require('./src/routes/contactRoutes'));

// GET featured experiences (Public)
app.get('/api/experiences/featured', async (req, res) => {
  try {
    const Experience = require('./src/models/Experience');
    const { limit = 6 } = req.query;
    const experiences = await Experience.find({ isVerified: true, isPopular: true })
      .sort({ rating: -1 })
      .limit(parseInt(limit));
    
    res.json({ 
      success: true, 
      count: experiences.length,
      experiences 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET categories (Public)
app.get('/api/experiences/categories', async (req, res) => {
  try {
    const Experience = require('./src/models/Experience');
    const categories = await Experience.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    status: 'success',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      experiences: '/api/experiences',
      states: '/api/states',
      reviews: '/api/reviews',
      test: '/api/test'
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Test: http://localhost:${PORT}/api/test`);
  console.log(`📡 Health: http://localhost:${PORT}/api/health`);
  console.log(`📡 API Endpoints:`);
  console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
  console.log(`   - States: http://localhost:${PORT}/api/states`);
  console.log(`   - Experiences: http://localhost:${PORT}/api/experiences`);
  console.log(`   - Reviews: http://localhost:${PORT}/api/reviews`);
});