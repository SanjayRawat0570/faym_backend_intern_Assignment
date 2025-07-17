const { v4: uuidv4 } = require('uuid');
const Event = require('../models/Event');
const validateEvent = require('../utils/validateEvent');

exports.createEvent = async (req, res) => {
  const error = validateEvent(req.body);
  if (error) return res.status(400).json({ error });

  const event = new Event({
    ...req.body,
    event_id: uuidv4(),
    timestamp: new Date(),
  });

  try {
    await event.save();
    res.status(202).json({ message: 'Event accepted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to store event' });
  }
};