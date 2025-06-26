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
  deleteEvent
} = require('../controllers/eventController.js');

router.post('/', createEvent);       //  post /api/events

router.get('/', getAllEvents);       //  get /api/events
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);



module.exports = router;