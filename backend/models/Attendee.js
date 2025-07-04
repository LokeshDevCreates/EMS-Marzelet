const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  customAttendeeId: { type: String, unique: true },
  name: String,
  age: Number,
  email: { type: String, unique: true },
  phone: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  bio: { type: String, maxlength: 250 },
  profileImage: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Attendee', attendeeSchema);
