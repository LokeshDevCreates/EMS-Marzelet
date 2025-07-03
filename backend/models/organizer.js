const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  customOrganizerId: { type: String, unique: true },
  name: String,
  age: Number,
  email: { type: String, unique: true },
  phone: { type: String, required: true, unique: true },
  organizationType: String,
  organizationName: String,
  profession: String,
  profileImage: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Organizer', organizerSchema);