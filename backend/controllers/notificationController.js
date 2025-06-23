// Notification Controller
exports.getUnreadCount = async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({ read: false });
    res.json({ unreadCount });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch unread count" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ read: false }, { $set: { read: true } });
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark notifications as read" });
  }
};

