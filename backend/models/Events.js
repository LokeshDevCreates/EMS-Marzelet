const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  organizerName: { type: String, required: true },
  organizerEmail: { type: String, required: true, match: /.+\@.+\..+/ },
  organizerPhone: { type: String, required: true, match: /^\d{10}$/ },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  description: { type: String, default: '' },
  arrangements: { type: [String], default: [] },
  foodItems: { type: [String], default: [] },
  seats: { type: Number, required: true },
  bookedSeats: { type: Number, default: 0 },
  price: { type: Number, required: true, min: 0 },
  offer: { type: String, default: '' },
  eventType: {
    type: [String],
    required: true,
    enum: ['Conference', 'Workshop', 'Seminar', 'Wedding','Family', 'Party', 'Concert', 'Exhibition','Trending','Hot','Mostbooked', 'Other'],
    default: ['Other']
  },
  eventImages: [{
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/[^\s]+|[a-zA-Z0-9-_]+\.(jpg|jpeg|png|gif|webp))$/.test(v);
      },
      message: props => `${props.value} is not a valid URL or image file name!`
    }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
