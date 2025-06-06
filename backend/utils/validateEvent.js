function validateEvent(event) {
  const { user_id, event_type, payload } = event;
  if (!user_id || !event_type || !payload) return 'Missing required fields';

  const validTypes = ['view', 'click', 'location'];
  if (!validTypes.includes(event_type)) return 'Invalid event_type';

  if (event_type === 'view' && !payload.url) return 'Missing url for view event';
  if (event_type === 'location') {
    if (typeof payload.latitude !== 'number' || typeof payload.longitude !== 'number') {
      return 'Invalid latitude/longitude for location event';
    }
  }

  return null;
}

module.exports = validateEvent;