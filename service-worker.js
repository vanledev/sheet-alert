// service-worker.js

self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "icon.png",
    badge: "badge.png",
  };

  event.waitUntil(
    self.registration.showNotification(
      "Notification from Your Website",
      options
    )
  );
});
