const crypto = require("crypto");
const razorpay = require("../../Razorpay");
const Booking = require("../../models/Booking");
const Event = require("../../models/Events");
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

// 1. Create Razorpay order
const initiateBooking = async (req, res) => {
  const { eventId } = req.params;
  const { userId, seats } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    const availableSeats = event.seats - event.bookedSeats;
    if (seats > availableSeats || seats < 1) {
      return res.status(400).json({ success: false, message: "Invalid number of seats" });
    }

    const totalAmount = event.price * seats * 100;

    const order = await razorpay.orders.create({
      amount: totalAmount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ success: false, message: "Could not initiate booking" });
  }
};

// 2. Verify Razorpay payment and save booking
const verifyAndStoreBooking = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userId,
    eventId,
    seats,
    amount,
  } = req.body;

  // Validate signature
  const generatedSignature = crypto
    .createHmac("sha256", RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Invalid payment signature" });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    if (event.bookedSeats + seats > event.seats) {
      return res.status(400).json({ success: false, message: "Not enough seats left" });
    }

    // Save booking
    const booking = new Booking({
      userId,
      eventId,
      seats,
      amountPaid: amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });

    await booking.save();

    // Update booked seats count
    event.bookedSeats += seats;
    await event.save();

    res.status(200).json({ success: true, message: "Booking stored", bookingId: booking._id });
  } catch (err) {
    console.error("Booking save error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getBookingsByOrganizer = async (req, res) => {
  try {
    const organizerId = req.params.organizerId;

    // Step 1: Find all events created by the organizer
    const events = await Event.find({ organizerId }).select("_id");
    const eventIds = events.map(event => event._id);

    // Step 2: Find bookings for those events
    const bookings = await Booking.find({ eventId: { $in: eventIds } })
      .populate("userId")
      .populate("eventId");

    res.json({ success: true, bookings });
  } catch (err) {
    console.error("Error fetching bookings by organizer:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {
  initiateBooking,
  verifyAndStoreBooking,
  getBookingsByOrganizer
};
