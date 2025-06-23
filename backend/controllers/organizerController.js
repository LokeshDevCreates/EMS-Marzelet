const Organizer = require('../models/organizer');
const bcrypt = require('bcryptjs');

// Organizer Registration
exports.registerOrganizer = async (req, res) => {
  try {
    const { name, email, password, organization } = req.body;

    // Check if email already exists
    const existing = await Organizer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new organizer
    const organizer = new Organizer({
      name,
      email,
      password: hashedPassword,
      organization,
    });

    const saved = await organizer.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// Get All Organizers
exports.getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find();
    res.status(200).json(organizers);
  } catch (err) {
    console.error('Error fetching organizers:', err);
    res.status(500).json({ message: 'Failed to fetch organizers', error: err.message });
  }
};

// Update Organizer
exports.updateOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, organization } = req.body;

    const updatedOrganizer = await Organizer.findByIdAndUpdate(
      id,
      { name, email, organization },
      { new: true }
    );

    if (!updatedOrganizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    res.status(200).json(updatedOrganizer);
  } catch (err) {
    console.error('Error updating organizer:', err);
    res.status(500).json({ message: 'Failed to update organizer', error: err.message });
  }
};

// Delete Organizer
exports.deleteOrganizer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrganizer = await Organizer.findByIdAndDelete(id);

    if (!deletedOrganizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    res.status(200).json({ message: 'Organizer deleted successfully' });
  } catch (err) {
    console.error('Error deleting organizer:', err);
    res.status(500).json({ message: 'Failed to delete organizer', error: err.message });
  }
};
