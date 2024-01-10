// server.js

const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");

 

 

 
 

// Generate VAPID keys
const vapidKeys = webPush.generateVAPIDKeys();

 

 
const app = express();
app.use(bodyParser.json());

// Replace these values with your own VAPID keys
const publicVapidKey =  vapidKeys.publicKey;
const privateVapidKey = vapidKeys.privateKey;

webPush.setVapidDetails(
  "mailto:your-email@example.com",
  publicVapidKey,
  privateVapidKey
);

// Serve static files
app.use(express.static(__dirname));

// Handle subscription requests
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});

  // Create payload for notification
  const payload = JSON.stringify({ title: "Notification from Your Website" });

  // Send notification
  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});


// Endpoint to trigger a notification
app.post('/send-notification', (req, res) => {
    const payload = JSON.stringify({ title: 'Notification from Your Server' });
  
    // Retrieve the subscription details from your storage
    // For demonstration purposes, we assume there's a hardcoded subscription
    const subscription = {
      endpoint: 'https://example.com/push-endpoint',
      keys: {
        auth: 'your-auth-key',
        p256dh: 'your-p256dh-key'
      }
    };
  
    // Send notification
    webPush.sendNotification(subscription, payload)
      .then(() => {
        res.status(200).json({ message: 'Notification sent successfully' });
      })
      .catch(err => {
        console.error('Error sending notification:', err);
        res.status(500).json({ error: 'Error sending notification' });
      });
  });
  
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
