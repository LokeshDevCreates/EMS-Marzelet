import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useUser } from "../../../context/UserContext.jsx"; // Adjust the path as per your project structure
import { auth } from "../../../../firebase.js";

const Settings = () => {
  const { user, logout } = useUser(); // Use context for user and logout
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        logout(); // Clear user state in context
        navigate("/login"); // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout error:", error);
        alert("Failed to logout. Please try again.");
      });
  };

  const closeModal = () => setIsModalOpen(false);

  if (!user) {
    // Redirect if not logged in
    navigate("/login");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Admin Settings</h1>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-4 text-gray-700">Profile Information</h2>
        <div className="space-y-2 text-gray-600">
          <p>
            <strong>Name:</strong> {user.displayName || "Admin"}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "emsmarzelet@gmail.com"}
          </p>
          <p>
            <strong>Role:</strong> {user.role || "Admin"}
          </p>
        </div>
      </section>

      <section>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition-colors duration-200 font-semibold"
        >
          Logout
        </button>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will need to log in again to access the system.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
