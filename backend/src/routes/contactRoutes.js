// backend/src/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Public routes (no authentication required)
router.post('/', contactController.submitContact);
router.get('/latest', contactController.getLatestContact);
router.get('/stats', contactController.getContactStats);
router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContactById);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;