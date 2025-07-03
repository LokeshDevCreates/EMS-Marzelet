const express = require('express');
const router = express.Router();

const {
  registerOrganizer,
  loginOrganizer,
  getAllOrganizers,
  updateOrganizer,
  deleteOrganizer,
  getOrganizerById,
  checkOrganizerByEmail,
  getOrganizerByEmail
} = require('../../controllers/organizerController/organizerController.js');

const upload = require('../../middleware/upload.js');
// routes/organizers.js or similar
router.get('/by-user/:email', getOrganizerByEmail);
router.get('/from-user/:email', checkOrganizerByEmail);
// ✅ Registration with image upload
router.post(
  '/register',
  upload.fields([{ name: 'profileImage', maxCount: 1 }]),
  registerOrganizer
);

// ✅ Login (optional or disabled)
router.post('/login', loginOrganizer);

// ✅ Get organizer by ID
router.get('/:id', getOrganizerById);

// ✅ Get all organizers
router.get('/', getAllOrganizers);

// ✅ Update organizer
router.put('/:id', updateOrganizer);

// ✅ Delete organizer
router.delete('/:id', deleteOrganizer);

module.exports = router;
