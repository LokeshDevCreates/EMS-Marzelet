const Venue = require('../models/venue');

const createVenue = async (req, res) => {
  try {
    const { name, location, capacity, amenities } = req.body;

    // 🧪 Validation
    if (!name || !location || !capacity || !amenities) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (capacity < 0) {
      return res.status(400).json({ message: 'Capacity must be a positive number' });
    }

    const newVenue = new Venue({ name, location, capacity, amenities });
    const savedVenue = await newVenue.save();
    res.status(201).json(savedVenue);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create venue', error });
  }
};


const getVenues = async (req, res) => {
  try {
    const { location, capacity } = req.query;
    const query = {};

    if (location) query.location = location;
    if (capacity) query.capacity = { $gte: parseInt(capacity) };

    const venues = await Venue.find(query);
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching venues', error });
  }
};


// Get a single venue by ID
const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch venue', error });
  }
};

// Update a venue by ID
const updateVenue = async (req, res) => {
  try {
    const { name, location, capacity, amenities } = req.body;

    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.id,
      { name, location, capacity, amenities },
      { new: true, runValidators: true }
    );

    if (!updatedVenue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    res.status(200).json({ message: 'Venue updated successfully', updatedVenue });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update venue', error });
  }
};


//delete a record
const deleteVenue = async (req, res) => {
  try {
    const deletedVenue = await Venue.findByIdAndDelete(req.params.id);

    if (!deletedVenue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    res.status(200).json({ message: 'Venue deleted successfully', deletedVenue });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete venue', error });
  }
};

module.exports = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue  ,
  deleteVenue
};