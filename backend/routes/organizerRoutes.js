const express = require('express');
const router = express.Router();
const {
  registerOrganizer,
  getAllOrganizers,
  updateOrganizer,
  deleteOrganizer,
} = require('../controllers/organizerController');

// Routes
router.post('/register', registerOrganizer); // Create a new organizer
router.get('/', getAllOrganizers); // Read all organizers
router.put('/:id', updateOrganizer); // Update an organizer
router.delete('/:id', deleteOrganizer); // Delete an organizer

module.exports = router;
