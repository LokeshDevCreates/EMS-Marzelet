const Attendee = require('../models/Attendee');

// Generate unique Attendee ID
const generateAttendeeId = async () => {
  const last = await Attendee.findOne().sort({ createdAt: -1 });
  const lastId = last?.customAttendeeId?.slice(2) || "10000";
  let newId = String(parseInt(lastId) + 1);
  while (await Attendee.findOne({ customAttendeeId: `AT${newId}` })) {
    newId = String(parseInt(newId) + 1);
  }
  return `AT${newId}`;
};

// ✅ Register Attendee
exports.registerAttendee = async (req, res) => {
  try {
    const {
      name, age, email, phone, gender, bio,
      address = {}
    } = req.body;

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    const exists = await Attendee.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const customAttendeeId = await generateAttendeeId();

    const profileImage = req.files?.profileImage?.[0]?.path.replace(/\\/g, '/') || null;

    const newAttendee = new Attendee({
      customAttendeeId,
      name,
      age,
      email,
      phone,
      gender,
      bio,
      profileImage,
      address,
    });

    const saved = await newAttendee.save();
    res.status(201).json({ message: 'Attendee registered successfully', attendeeId: customAttendeeId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// ✅ Get Attendee by ID
exports.getAttendeeById = async (req, res) => {
  try {
    const attendee = await Attendee.findById(req.params.id);
    if (!attendee) return res.status(404).json({ message: 'Attendee not found' });
    res.status(200).json(attendee);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendee', error: err.message });
  }
};
// ✅ Check Organizer By Email
exports.checkAttendeeByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const attendees = await Attendee.findOne({ email });
    if (!attendees) {
      return res.status(404).json({ exists: false });
    }
    res.status(200).json({ exists: true });
  } catch (err) {
    console.error('Error checking organizer by email:', err);
    res.status(500).json({ message: 'Error checking email', error: err.message });
  }
};
// ✅ Get All Attendees
exports.getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.status(200).json(attendees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendees', error: err.message });
  }
};

// ✅ Update Attendee
exports.updateAttendee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // 1. Handle new uploaded image if present
    const profileImage = req.files?.profileImage?.[0]?.path.replace(/\\/g, "/");

    if (profileImage) {
      updates.profileImage = profileImage;
    } else if (req.body.existingImage) {
      updates.profileImage = req.body.existingImage;
    } else {
      updates.profileImage = null; // fallback to null if image removed
    }

    const updated = await Attendee.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) return res.status(404).json({ message: "Attendee not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update attendee", error: err.message });
  }
};

// ✅ Delete Attendee
exports.deleteAttendee = async (req, res) => {
  try {
    const deleted = await Attendee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Attendee not found' });
    res.status(200).json({ message: 'Attendee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete attendee', error: err.message });
  }
};

// ✅ Get Attendee by Email
exports.getAttendeeByEmail = async (req, res) => {
  try {
    const attendee = await Attendee.findOne({ email: req.params.email });
    if (!attendee) return res.status(404).json({ message: 'Attendee not found' });
    res.status(200).json(attendee);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch attendee by email', error: err.message });
  }
};
