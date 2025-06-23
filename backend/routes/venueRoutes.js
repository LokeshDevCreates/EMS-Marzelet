const express = require('express');
const router = express.Router();

const {
  createVenue,
  getVenues,
  getVenueById,
  deleteVenue,
  updateVenue
} = require('../controllers/venueController');

router.post('/', createVenue);                  // post /api/venues
router.get('/', getVenues);                     //get /api/venues
router.get('/:id', getVenueById);               //get /api/venues/id
router.delete('/:id', deleteVenue);             // delete /api/venues/id
router.put('/:id', updateVenue); // ✅ Update route   //update /api/venues/id

module.exports = router;