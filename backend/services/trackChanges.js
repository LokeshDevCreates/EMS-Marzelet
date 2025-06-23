const mongoose = require("mongoose");
const axios = require("axios");

const trackChanges = () => {
  const collectionsToWatch = ["events", "organizers", "users", "venues"]; // Exclude "notifications" here

  collectionsToWatch.forEach((collection) => {
    const changeStream = mongoose.connection.collection(collection).watch();

    changeStream.on("change", async (change) => {
      const notificationData = {
        title: `${collection} Updated`,
        message: `Change detected in ${collection}: ${JSON.stringify(change)}`,
        timestamp: new Date(),
        read: false,
      };

      // Send POST request to the notifications collection API
      try {
        await axios.post("http://localhost:5000/api/notifications", notificationData);
        console.log(`Notification sent for ${collection} change.`);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });
  });
};

module.exports = trackChanges;
