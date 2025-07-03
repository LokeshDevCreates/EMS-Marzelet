const Event = require('../models/event');
const Booking = require('../models/booking');

exports.getDashboardSummary = async (req, res) => {
  try {
    const { organizerId } = req.params;

    const totalEvents = await Event.countDocuments({ organizerId });
    const upcomingEvents = await Event.countDocuments({ organizerId, date: { $gte: new Date() } });

    const events = await Event.find({ organizerId });
    const eventIds = events.map(e => e._id);
    const totalBookings = await Booking.countDocuments({ eventId: { $in: eventIds } });

    res.json({
      totalEvents,
      totalBookings,
      upcomingEvents
    });
  } catch (err) {
    res.status(500).json({ message: 'Dashboard summary fetch failed', error: err.message });
  }
};