const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload');

const {
  registerOrganizer,
  loginOrganizer,
  getAllOrganizers,
  updateOrganizer,
  deleteOrganizer,
  getOrganizerById,
  checkOrganizerByEmail,
  getOrganizerByEmail
} = require('../../controllers/organizerController/organizerController');

// ✅ Register Organizer with image upload
router.post(
  '/register',
  upload.fields([{ name: 'profileImage', maxCount: 1 }]),
  registerOrganizer
);

// ✅ Login disabled (optional endpoint)
router.post('/login', loginOrganizer);

// ✅ Get full organizer by email
router.get('/by-user/:email', getOrganizerByEmail);

// ✅ Check if email exists
router.get('/from-user/:email', checkOrganizerByEmail);

// ✅ Get Organizer by ID
router.get('/:id', getOrganizerById);

// ✅ Get All Organizers
router.get('/', getAllOrganizers);

// ✅ Update Organizer
router.put('/:id', upload.single('profileImage'), updateOrganizer);

// ✅ Delete Organizer
router.delete('/:id', deleteOrganizer);

module.exports = router;
