import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useUser } from "../../../context/UserContext.jsx";
import { auth } from "../../../../firebase.js";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const OrganizerSettings = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail] = useState(user?.email || "");

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        logout();
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Failed to logout.");
      });
  };

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Reset failed");
      }

      toast.success("Password reset email sent! Check your inbox.");
      setIsResetModalOpen(false);
    } catch (error) {
      console.error("Reset error:", error);
      toast.error(error.message);
    }
  };

  const downloadCSV = async () => {
    try {
      const organizerId = localStorage.getItem("organizerId");

      const [eventsRes, bookingsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/events/organizer/${organizerId}`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/organizer/${organizerId}/bookings`)
      ]);

      const events = eventsRes.data.events || [];
      const bookings = bookingsRes.data.bookings || [];

      const rows = bookings.length
        ? bookings.map(booking => {
            const event = events.find(e => e._id === booking.eventId?._id);
            return {
              "Event Name": event?.name || "N/A",
              "Event Date": event?.date || "N/A",
              "Start Time": event?.startTime || "N/A",
              "End Time": event?.endTime || "N/A",
              "Attendee Name": booking.userId?.name || "N/A",
              "Attendee Email": booking.userId?.email || "N/A",
              "Seats Booked": booking.seats || 0,
              "Amount Paid": booking.amountPaid || 0,
              "Payment ID": booking.paymentId || "N/A",
              "Booking Time": new Date(booking.createdAt).toLocaleString(),
            };
          })
        : events.map(event => ({
            "Event Name": event.name || "N/A",
            "Event Date": event.date || "N/A",
            "Start Time": event.startTime || "N/A",
            "End Time": event.endTime || "N/A",
            "Attendee Name": "N/A",
            "Attendee Email": "N/A",
            "Seats Booked": 0,
            "Amount Paid": 0,
            "Payment ID": "N/A",
            "Booking Time": "N/A"
          }));

      if (!rows.length) {
        toast.info("No events or bookings to export.");
        return;
      }

      const csvContent = convertToCSV(rows);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "event_bookings.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("CSV downloaded successfully!");
    } catch (error) {
      console.error("CSV Download Error:", error);
      toast.error("Failed to download CSV.");
    }
  };

  const convertToCSV = (data) => {
    if (!data.length) return "";
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map(row =>
        headers.map(field => `"${String(row[field]).replace(/"/g, '""')}"`).join(",")
      )
    ];
    return csvRows.join("\n");
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <>
      <ToastContainer />

      {/* Top Bar with Logout */}
      <div className="flex justify-end px-6 pt-6">
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Logout
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-6 mb-32 p-6 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Organizer Settings</h2>
        <p className="text-gray-600 mb-6">
          Manage your account settings, download event reports, and change your password.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 space-y-6 border">
          {/* Account Info */}
          <div className="space-y-1">
            <p className="text-lg text-gray-800 font-medium">Account Information</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Role:</span> {user.role || "Organizer"}</p>
          </div>

          {/* Download CSV */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Download Event Bookings</h3>
            <p className="text-gray-600 mb-2 text-sm">
              Export your event data into a CSV file for reporting, accounting, or record-keeping purposes.
            </p>
            <button
              onClick={downloadCSV}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Download CSV
            </button>
          </div>

          {/* Change Password */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
            <p className="text-gray-600 mb-2 text-sm">
              If you’d like to reset your password, click below. You’ll receive a reset link via email.
            </p>
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Send Reset Email
            </button>
          </div>
        </div>
      </div>

      {/* 🔐 Reset Password Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Reset Password</h3>
            <input
              type="email"
              value={resetEmail}
              disabled
              className="border w-full p-3 mb-4 rounded bg-gray-100 text-sm"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handlePasswordReset}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
              >
                Send Reset Email
              </button>
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚪 Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You’ll need to log in again to access your dashboard.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default OrganizerSettings;
