// Home.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useUser } from "../context/UserContext";
import Events from "../components/Events";
import Footer from "../components/Footer";
import Login from "./Login";
import Signup from "./Signup";
import { User } from "lucide-react";

const Home = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState("Chennai");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
      const handleViewProfile = () => {
      setShowDropdown(false);
      navigate("/profile");
    };

    const handleContact = () => {
      setShowDropdown(false);
      navigate("/contact");
    };

    const handleLogoutModal = () => {
      setShowDropdown(false);
      setIsModalOpen(true);
    };

  useEffect(() => {
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      setLocation(storedLocation);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `${import.meta.env.VITE_API_URL}/api/maps/geocode?lat=${latitude}&lng=${longitude}`
          )
            .then((response) => response.json())
            .catch((error) => console.error("Error fetching location:", error));
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Your Location");
        }
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("location", location);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const attendeeDropdown = {
    element: (
      <div className="relative hidden md:block" ref={dropdownRef}>
          <button
            className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <User className="w-6 h-6 text-gray-800" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleViewProfile}
              >
                View Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleContact}
              >
                Contact
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={handleLogoutModal}
              >
                Logout
              </button>
            </div>
          )}
        </div>
    ),
  };

  const authActions = user
    ? user.role === "Attendee"
      ? [attendeeDropdown]
      : [
          {
            name: "Logout",
            action: () => setIsModalOpen(true),
            style:
              "text-lg bg-transparent text-red-600 px-4 font-medium hover:underline",
          },
          {
            name: "Dashboard",
            action: () => {
              if (user?.role === "Admin") navigate("/admin-dashboard");
              else if (user?.role === "Organizer") navigate("/organizer-dashboard");
            },
            style:
              "text-lg bg-transparent text-blue-600 px-4 font-medium hover:underline",
          },
        ]
    : [
        {
          name: "Login",
          action: () => setIsLoginModalOpen(true),
          style:
            "text-lg bg-transparent text-blue-600 px-4 font-medium hover:underline",
        },
        {
          name: "Sign Up",
          action: () => setIsSignupModalOpen(true),
          style:
            "text-lg bg-transparent text-blue-600 px-4 font-medium hover:underline",
        },
      ];

  return (
    <>
      <div className="min-h-screen bg-white">
        <Events
          location={location}
          setLocation={setLocation}
          authActions={authActions}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setIsModalOpen={setIsModalOpen}
        />

        {/* Logout Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout? You will need to log in again for further booking.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Login Modal */}
        {isLoginModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-10 right-4 text-gray-900 text-2xl hover:text-gray-800 transition"
              >
                ✖
              </button>
              <Login />
            </div>
          </div>
        )}

        {/* Signup Modal */}
        {isSignupModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
              <button
                onClick={() => setIsSignupModalOpen(false)}
                className="absolute top-10 right-4 text-gray-900 text-2xl hover:text-gray-800 transition"
              >
                ✖
              </button>
              <Signup />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
