import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, sendPasswordResetEmail } from "firebase/auth";
import { useUser } from "../../../context/UserContext.jsx";
import { auth } from "../../../../firebase.js";
import Footer from "../../../components/Footer";

const OrganizerSettings = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        logout();
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        alert("Failed to logout. Please try again.");
      });
  };

  const handleChangePassword = () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        alert("Password reset email sent! Please check your inbox.");
      })
      .catch((error) => {
        console.error("Password reset error:", error);
        alert("Failed to send reset email. Please try again.");
      });
  };

  const closeModal = () => setIsModalOpen(false);

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <>
      <div className="max-w-2xl mx-auto mt-24 mb-32 p-6 bg-white shadow-2xl rounded-2xl relative">
        {/* Top Right Buttons */}
        <div className="absolute top-4 right-4 flex gap-3">
          <button
            onClick={handleChangePassword}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Change Password
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Organizer Settings
        </h2>

        <div className="text-gray-700 space-y-2 mb-10">
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Role:</span> {user.role || "Organizer"}
          </p>
        </div>

        <div className="space-y-6">
          {/* 📍 Default Event Location */}
          <div>
            <label className="block font-medium mb-1">
              📍 Set Default Event Location
            </label>
            <input
              type="text"
              placeholder="Enter default location"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* 🔁 Auto-Repeat */}
          <div className="flex items-center gap-3">
            <label className="font-medium">🔁 Enable Auto-Repeat for Events</label>
            <input type="checkbox" className="toggle toggle-primary" />
          </div>

          {/* 📦 Export Booking Reports */}
          <div>
            <label className="block font-medium mb-1">
              📦 Export Booking Reports
            </label>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
              Export as CSV
            </button>
          </div>

          {/* 🧾 Invoice Settings */}
          <div>
            <label className="block font-medium mb-1">🧾 Invoice Settings</label>
            <input
              type="text"
              placeholder="GSTIN / Organization Address"
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            />
            <input
              type="file"
              accept="image/*"
              className="block w-full"
            />
          </div>

          {/* ⏱ Booking Window Limit */}
          <div>
            <label className="block font-medium mb-1">
              ⏱ Booking Window Limit (in days)
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 30"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* 📑 Custom Booking Policy */}
          <div>
            <label className="block font-medium mb-1">
              📑 Set Custom Booking Policy
            </label>
            <textarea
              rows="5"
              placeholder="Enter cancellation, refund, and other policies..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will need to login again to access your dashboard.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
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
