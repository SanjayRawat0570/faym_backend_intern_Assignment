self.addEventListener('install', event => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});

self.addEventListener('message', async (event) => {
  const eventData = event.data;
  try {
    await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });
    console.log('Event sent:', eventData);
  } catch (err) {
    console.error('Failed to send', err);
  }
});