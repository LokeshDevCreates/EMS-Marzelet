const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// @route   POST /api/bookings
// @desc    Save a new booking
router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings (optional)
router.get('/', async (_req, res) => {
  try {
    const bookings = await Booking.find().sort('-createdAt');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;