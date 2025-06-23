const express = require('express');
const Notification = require('../models/Notifications'); // Import Notification model
const { getUnreadCount, markAsRead } = require('../controllers/notificationController.js'); // Import controller functions
const router = express.Router();

// Fetch all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ timestamp: -1 }); // Sort by most recent
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});
router.get('/unread-count', getUnreadCount);
router.put('/mark-as-read', markAsRead);

router.post("/api/notifications", async (req, res) => {
  try {
    const { title, message, timestamp, read } = req.body;

    const newNotification = new Notification({
      title,
      message,
      timestamp,
      read,
    });

    await newNotification.save();
    res.status(201).json({ message: "Notification saved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error saving notification.", error });
  }
});


module.exports = router;
