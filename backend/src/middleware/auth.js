const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No token, authorization denied' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'travelbharat_super_secret_key_2026');
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    if (!user.isActive) {
      return res.status(403).json({ 
        success: false,
        message: 'Account is deactivated' 
      });
    }
    
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false,
      message: 'Invalid or expired token' 
    });
  }
};

// Authorization middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: 'You do not have permission to perform this action' 
      });
    }
    next();
  };
};