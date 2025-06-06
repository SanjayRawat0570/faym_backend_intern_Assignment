const Event = require('../models/Event');

exports.getEventCount = async (req, res) => {
  const { event_type, start_date, end_date } = req.query;
  const filter = {};

  if (event_type) filter.event_type = event_type;
  if (start_date || end_date) filter.timestamp = {};
  if (start_date) filter.timestamp.$gte = new Date(start_date);
  if (end_date) filter.timestamp.$lte = new Date(end_date);

  try {
    const total_events = await Event.countDocuments(filter);
    res.json({ total_events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve count' });
  }
};

exports.getEventCountsByType = async (req, res) => {
  const { start_date, end_date } = req.query;
  const filter = {};

  if (start_date || end_date) filter.timestamp = {};
  if (start_date) filter.timestamp.$gte = new Date(start_date);
  if (end_date) filter.timestamp.$lte = new Date(end_date);

  try {
    const results = await Event.aggregate([
      { $match: filter },
      { $group: { _id: "$event_type", count: { $sum: 1 } } },
    ]);

    const response = {};
    results.forEach(r => response[r._id] = r.count);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve analytics' });
  }
};