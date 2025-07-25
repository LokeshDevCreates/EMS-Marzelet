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
    const organizerId = req.params.id;

    const events = await Event.find({ organizerId });

    const bookingsWithEvents = await Promise.all(
      events.map(async (event) => {
        const bookings = await Booking.find({ eventId: event._id }).populate("userId");

        const formatted = bookings.map((booking) => ({
          eventId: event._id,
          eventName: event.name,
          eventDate: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
          userId: booking.userId || null,
          attendeeName: booking.userId?.name || "N/A",
          attendeeEmail: booking.userId?.email || "N/A",
          numSeats: booking.seats,
          bookingAmount: booking.amountPaid,
          paymentId: booking.paymentId,
          createdAt: booking.createdAt
        }));

        if (formatted.length === 0) {
          return [{
            eventId: event._id,
            eventName: event.name,
            eventDate: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            userId: null,
            attendeeName: "-",
            attendeeEmail: "-",
            numSeats: 0,
            bookingAmount: 0,
            paymentId: "-",
            createdAt: new Date()
          }];
        }

        return formatted;
      })
    );

    const flatList = bookingsWithEvents.flat();
    res.status(200).json({ bookings: flatList });
  } catch (err) {
    console.error("Error in getBookingsForOrganizerWithEvents:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



module.exports = {
  initiateBooking,
  verifyAndStoreBooking,
  getBookingsByOrganizer
};
