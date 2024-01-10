// main.js

document.addEventListener('DOMContentLoaded', () => {
    const subscribeBtn = document.getElementById('subscribeBtn');
  
    subscribeBtn.addEventListener('click', () => {
      // Request notification permission
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // Subscribe to push notifications
          navigator.serviceWorker.register('service-worker.js')
            .then(registration => registration.pushManager.subscribe({ userVisibleOnly: true }))
            .then(subscription => {
              // Send subscription to the server
              fetch('/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: { 'Content-Type': 'application/json' }
              });
            })
            .catch(err => console.error('Service Worker registration failed:', err));
        }
      });
    });
  });
  