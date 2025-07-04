const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const {
  registerAttendee,
  getAttendeeById,
  getAllAttendees,
  updateAttendee,
  deleteAttendee,
  getAttendeeByEmail,
  checkAttendeeByEmail
} = require('../controllers/attendeeController');

// Register
router.post('/register', upload.fields([{ name: 'profileImage', maxCount: 1 }]), registerAttendee);

// Get all
router.get('/', getAllAttendees);

// Get by ID
router.get('/:id', getAttendeeById);

// Get by Email
router.get('/by-email/:email', getAttendeeByEmail);
router.get('/from-user/:email', checkAttendeeByEmail);
// Update
router.put('/:id', upload.fields([{ name: 'profileImage', maxCount: 1 }]), updateAttendee);

// Delete
router.delete('/:id', deleteAttendee);

module.exports = router;
