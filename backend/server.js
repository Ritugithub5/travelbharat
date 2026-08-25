// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ============================================
// CORS CONFIGURATION
// ============================================
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'https://travelbharat-frontend-am5f.onrender.com',
    'https://travelbharat-frontend.onrender.com',
    'https://travelbharat-073a.onrender.com',
    '*'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// MONGODB CONNECTION
// ============================================
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbharat_db')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ============================================
// ROUTES
// ============================================

// Auth Routes
app.use('/api/auth', require('./src/routes/authRoutes'));

// State Routes
app.use('/api/states', require('./src/routes/stateRoutes'));

// Experience Routes
app.use('/api/experiences', require('./src/routes/experienceRoutes'));

// Review Routes
app.use('/api/reviews', require('./src/routes/reviewRoutes'));

// Contact Routes
app.use('/api/contact', require('./src/routes/contactRoutes'));

// ============================================
// ADDITIONAL API ROUTES
// ============================================

// GET featured experiences
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
    console.error('Error fetching featured:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET categories
app.get('/api/experiences/categories', async (req, res) => {
  try {
    const Experience = require('./src/models/Experience');
    const categories = await Experience.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET latest contact info
app.get('/api/contact/latest', async (req, res) => {
  try {
    const Contact = require('./src/models/Contact');
    const contact = await Contact.findOne().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      contact: contact || {
        email: 'info@travelbharat.com',
        phone: '+91 12345 67890',
        address: '123, Travel Street, New Delhi, India',
        hours: 'Mon-Fri 9AM-6PM IST'
      }
    });
  } catch (error) {
    console.error('Error fetching latest contact:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// TEST ROUTES
// ============================================

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    status: 'success',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      login: '/api/auth/login',
      register: '/api/auth/register',
      states: '/api/states',
      experiences: '/api/experiences',
      reviews: '/api/reviews',
      contact: '/api/contact',
      test: '/api/test',
      health: '/api/health'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Debug route - shows all registered routes
app.get('/api/debug', (req, res) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
      routes.push({
        path: middleware.route.path,
        methods: methods
      });
    }
  });
  res.json({
    success: true,
    message: 'All registered routes',
    routes: routes,
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ============================================
// ERROR HANDLING - MUST BE LAST
// ============================================

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📡 Test: http://localhost:${PORT}/api/test`);
  console.log(`📡 Health: http://localhost:${PORT}/api/health`);
  console.log(`📡 Debug: http://localhost:${PORT}/api/debug`);
  console.log(`\n📡 API Endpoints:`);
  console.log(`   POST /api/auth/register`);
  console.log(`   POST /api/auth/login`);
  console.log(`   GET  /api/states`);
  console.log(`   GET  /api/experiences`);
  console.log(`   GET  /api/test`);
  console.log(`   GET  /api/health`);
  console.log(`\n✅ Ready for requests!\n`);
});