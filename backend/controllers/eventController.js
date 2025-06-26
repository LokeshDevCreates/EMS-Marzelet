const Event = require('../models/Events.js');

// Helper to check overlapping events, with optional exclusion of current event
const hasOverlap = async (venueId, date, startTime, endTime, excludeId = null) => {
  const query = {
    venueId,
    date,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  };

  if (excludeId) {
    query._id = { $ne: excludeId }; // exclude the current event being updated
  }

  const overlappingEvent = await Event.findOne(query);
  return !!overlappingEvent;
};

// Create event
exports.createEvent = async (req, res) => {
  try {
    const {
      name, venueId, organizerId, organizerName, organizerEmail, organizerPhone, date,
      startTime, endTime, description,
      arrangements, foodItems, seats,
      eventImages, eventType, offer, location, price
    } = req.body;

    if (!name || !venueId || !organizerId || !date || !startTime || !endTime || seats < 0 || !Array.isArray(eventImages) || eventImages.length === 0 || !location || price < 0) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }

    const overlap = await hasOverlap(venueId, date, startTime, endTime);
    if (overlap) {
      return res.status(409).json({ message: 'Event time overlaps with an existing event at this venue' });
    }
   const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
    const newEvent = new Event({
      name,
      venueId,
      organizerId,
      organizerName,
      organizerEmail,
      organizerPhone,
      date,
      startTime,
      endTime,
      description,
      arrangements,
      foodItems,
      price,
      offer: offer || '',
      location: {
        type: 'Point',
        coordinates: parsedLocation.coordinates
      },
      seats,
      eventType: eventType || 'general', // Default to 'general' if not provided
      eventImages,
      bookedSeats: 0
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {

      console.error("Event creation error:", error); 
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Get all events (with optional filters)
exports.getAllEvents = async (req, res) => {
  try {
    const { venueId, date } = req.query;
    const filter = {};
    if (venueId) filter.venueId = venueId;
    if (date) filter.date = date;

    const events = await Event.find(filter);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const {
      name, venueId, organizerId, organizerName, organizerEmail, organizerPhone, date,
      startTime, endTime, description, eventType,
      arrangements, foodItems, seats, eventImages, location, price, offer
    } = req.body;

    if (!name || !venueId || !organizerId || !date || !startTime || !endTime || seats < 0 || !Array.isArray(eventImages) || eventImages.length === 0 || !location || price < 0) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }

    // Prevent false overlap check on the event itself
    const overlap = await hasOverlap(venueId, date, startTime, endTime, req.params.id);
    if (overlap) {
      return res.status(409).json({ message: 'Event time overlaps with an existing event at this venue' });
    }

    const updated = await Event.findByIdAndUpdate(req.params.id, {
      name, venueId, organizerId, organizerName, organizerEmail, organizerPhone, date, startTime, eventType,
      endTime, description, arrangements, foodItems, seats, eventImages, location, price, offer
    }, { new: true });

    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};


// Delete event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};