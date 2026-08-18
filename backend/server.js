// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware - Updated CORS with all possible frontend ports
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://localhost:3002', 
    'http://localhost:3003',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'http://127.0.0.1:3003'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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

// ============================================
// Routes
// ============================================
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/states', require('./src/routes/stateRoutes'));
app.use('/api/experiences', require('./src/routes/experienceRoutes'));
app.use('/api/reviews', require('./src/routes/reviewRoutes'));
app.use('/api/contact', require('./src/routes/contactRoutes'));

// ============================================
// Additional API Routes (must come before /:id)
// ============================================

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
    console.error('Error fetching featured:', error);
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
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET latest contact info (Public)
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
// Test and Health Routes
// ============================================

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
      contact: '/api/contact',
      test: '/api/test',
      health: '/api/health'
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

// ============================================
// Error Handling
// ============================================

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

// ============================================
// Start Server
// ============================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📡 Test: http://localhost:${PORT}/api/test`);
  console.log(`📡 Health: http://localhost:${PORT}/api/health`);
  console.log(`\n📡 API Endpoints:`);
  console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
  console.log(`   - States: http://localhost:${PORT}/api/states`);
  console.log(`   - Experiences: http://localhost:${PORT}/api/experiences`);
  console.log(`   - Reviews: http://localhost:${PORT}/api/reviews`);
  console.log(`   - Contact: http://localhost:${PORT}/api/contact`);
  console.log(`\n✅ Ready for requests!\n`);
});