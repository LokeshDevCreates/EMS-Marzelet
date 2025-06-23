import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Bell, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Sidebar from "../admincomponents/Sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Fetch unread count on load
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notifications/unread-count");
        setNotificationCount(response.data.unreadCount);
      } catch (error) {
        console.error("Failed to fetch unread count:", error);
      }
    };

    fetchUnreadCount();

    // Set up real-time updates using socket.io
    const socket = io("http://localhost:5000");
    socket.on("notification", () => {
      setNotificationCount((prevCount) => prevCount + 1);
    });

    return () => socket.disconnect(); // Cleanup socket connection
  }, []);

  useEffect(() => {
    // Reset the count when visiting the notifications page
    const markNotificationsAsRead = async () => {
      if (location.pathname === "/admin-dashboard/notifications") {
        try {
          await axios.put("http://localhost:5000/api/notifications/mark-as-read");
          setNotificationCount(0); // Immediately reset the count
        } catch (error) {
          console.error("Failed to mark notifications as read:", error);
        }
      }
    };

    markNotificationsAsRead();
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-700 ml-10">
            Event Booking Management System
          </h1>
          <div className="flex items-center gap-6">
            {/* Bell Notification */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/admin-dashboard/notifications")}
            >
              <Bell size={24} />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {notificationCount}
                </span>
              )}
            </div>
            {/* Settings Button */}
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => navigate("/admin-dashboard/settings")}
            >
              <Settings size={24} />
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
