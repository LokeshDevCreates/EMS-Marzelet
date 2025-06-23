const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    category: { type: String, required: true },
    eventDate: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentDetails: { type: Object, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);