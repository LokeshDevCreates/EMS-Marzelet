const express = require('express')
const router = express.Router();
router.get('/test', (req, res) => {
  res.send('Event route working ✅');
});

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventsByOrganizer
} = require('../controllers/eventController.js');
const checkBankDetails = require("../middleware/checkBankDetails.js")
router.post('/',createEvent);       //  post /api/events

router.get('/', getAllEvents);       //  get /api/events
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.get("/organizer/:organizerId", getEventsByOrganizer);


module.exports = router;