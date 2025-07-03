import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useUser } from "../../../context/UserContext.jsx";
import { auth } from "../../../../firebase.js";
import Footer from "../../../components/Footer"
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

  if (!user) {
    navigate("/");
    return null;
  }

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
    <div className="max-w-sm mx-auto mt-44 mb-44 p-8 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        Organizer Settings
      </h2>

      <div className="text-gray-700 space-y-2 mb-8">
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Role:</span> {user.role || "Organizer"}</p>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-300"
      >
        Logout
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Logout</h3>
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
    </div>
    <Footer />
    </>
  );
};

export default OrganizerSettings;
