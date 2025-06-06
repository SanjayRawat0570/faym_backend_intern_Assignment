const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  event_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: String,
    required: true,
    index: true,
  },
  event_type: {
    type: String,
    enum: ['view', 'click', 'location'],
    required: true,
    index: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
  payload: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model('Event', EventSchema);