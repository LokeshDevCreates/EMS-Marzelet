import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch all stored notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();

    // Connect to Socket.IO server for real-time updates
    const socket = io("http://localhost:5000");

    socket.on("notification", (data) => {
      setNotifications((prevNotifications) => {
        // Ensure no duplicates in the notifications list
        const updatedNotifications = [data, ...prevNotifications];
        return updatedNotifications.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t._id === item._id)
        );
      });
    });

    // Cleanup connection on component unmount
    return () => socket.disconnect();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Notifications</h1>
      {notifications.length > 0 ? (
        <div className="space-y-4 ">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className="bg-white p-5 w-96 sm:w-full rounded-lg shadow-md border border-gray-200 flex items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-lg font-bold">
                📬
              </div>
              <div className="ml-4">
                <p className="text-gray-800 font-medium sm:break-words lg:break-normal">
                  {notification.message.length > 200 ? `${notification.message.slice(0, 200)}...` : notification.message}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600">No notifications yet.</p>
        </div>
      )}
    </div>
  );
};

export default Notifications; 