if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('service-worker.js');
      console.log('Service Worker registered', registration);

      // Send a view event when the page loads
      const viewEvent = {
        user_id: generateUserId(),
        event_type: "view",
        payload: {
          url: window.location.href,
          title: document.title
        }
      };
      registration.active?.postMessage(viewEvent);

      document.getElementById('click-me').addEventListener('click', () => {
        const clickEvent = {
          user_id: generateUserId(),
          event_type: "click",
          payload: {
            element_id: "click-me",
            text: "Click Me",
            xpath: "#click-me"
          }
        };
        registration.active?.postMessage(clickEvent);
      });

      document.getElementById('get-location').addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(position => {
          const locationEvent = {
            user_id: generateUserId(),
            event_type: "location",
            payload: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            }
          };
          registration.active?.postMessage(locationEvent);
        });
      });
    } catch (err) {
      console.error('Service Worker registration failed', err);
    }
  });
}

function generateUserId() {
  if (!localStorage.getItem('user_id')) {
    localStorage.setItem('user_id', 'user_' + Math.random().toString(36).substring(2));
  }
  return localStorage.getItem('user_id');
}

