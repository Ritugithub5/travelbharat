// backend/src/controllers/contactController.js
const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, address, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    const contact = new Contact({
      name,
      email,
      phone: phone || '',
      address: address || '',
      subject,
      message,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || ''
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you! We will get back to you soon.',
      contact
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit contact form'
    });
  }
};

// @desc    Get latest contact info (Public)
// @route   GET /api/contact/latest
// @access  Public
exports.getLatestContact = async (req, res) => {
  try {
    // Try to get the most recent contact submission
    const contact = await Contact.findOne().sort({ createdAt: -1 });
    
    if (contact) {
      res.json({
        success: true,
        contact: {
          email: contact.email || 'info@travelbharat.com',
          phone: contact.phone || '+91 12345 67890',
          address: contact.address || '123, Travel Street, New Delhi, India',
          hours: 'Mon-Fri 9AM-6PM IST'
        }
      });
    } else {
      // Return default if no data
      res.json({
        success: true,
        contact: {
          email: 'info@travelbharat.com',
          phone: '+91 12345 67890',
          address: '123, Travel Street, New Delhi, India',
          hours: 'Mon-Fri 9AM-6PM IST'
        }
      });
    }
  } catch (error) {
    console.error('Error fetching latest contact:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all contact submissions (Public - no auth needed)
// @route   GET /api/contact
// @access  Public
exports.getContacts = async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    
    let query = {};
    if (status) query.status = status;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      success: true,
      count: contacts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single contact by ID (Public)
// @route   GET /api/contact/:id
// @access  Public
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    // Mark as read
    if (!contact.isRead) {
      contact.isRead = true;
      contact.status = 'read';
      await contact.save();
    }
    
    res.json({
      success: true,
      contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update contact status (Public)
// @route   PUT /api/contact/:id
// @access  Public
exports.updateContact = async (req, res) => {
  try {
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { 
        status: status || 'read',
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact updated successfully',
      contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete contact (Public)
// @route   DELETE /api/contact/:id
// @access  Public
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get contact statistics (Public)
// @route   GET /api/contact/stats
// @access  Public
exports.getContactStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: 'new' });
    const readCount = await Contact.countDocuments({ status: 'read' });
    const repliedCount = await Contact.countDocuments({ status: 'replied' });
    const archivedCount = await Contact.countDocuments({ status: 'archived' });
    
    // Get last 7 days stats
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const last7Days = await Contact.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $group: {
        _id: { $dayOfMonth: '$createdAt' },
        count: { $sum: 1 }
      }},
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      stats: {
        total,
        new: newCount,
        read: readCount,
        replied: repliedCount,
        archived: archivedCount,
        last7Days
      }
    });
  } catch (error) {
    console.error('Error getting contact stats:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};