const express = require("express");
const router = express.Router();

const {
  initiateBooking,
  verifyAndStoreBooking,
  getBookingsByOrganizer
} = require("../controllers/organizerController/bookingController");

// Create Razorpay order
router.post("/:eventId/book", initiateBooking);

// Verify Razorpay payment and store booking
router.post("/verify", verifyAndStoreBooking);
router.get("/organizer/:organizerId/bookings", getBookingsByOrganizer);


module.exports = router;
