import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the logout confirmation modal

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events-list" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const authActions = user
    ? [
        {
          name: "Logout",
          action: () => setIsModalOpen(true), // Open the confirmation modal
          style: "text-lg bg-transparent text-white px-4 font-semibold hover:text-gray-200 transition md:bg-white md:text-purple-600 md:hover:bg-purple-300 md:hover:text-white rounded-full md:px-6 md:py-2",
        },
        {
          name: "Dashboard",
          action: () => {
            if (user?.role === "Admin") {
              navigate("/admin-dashboard");
            } else if (user?.role === "Organizer") {
              navigate("/organizer-dashboard");
            } else if (user?.role === "Attendee") {
              navigate("/attendee-dashboard");
            } else {
              navigate("/login");
            }
          },
          style: "text-lg bg-transparent text-white px-4 font-semibold hover:text-gray-200 transition md:bg-purple-600 text-white md:hover:bg-purple-700 rounded-full md:px-6 md:py-2",
        },
      ]
    : [
        {
          name: "Login",
          path: "/login",
          style: "text-lg bg-transparent text-white px-4 font-semibold hover:text-gray-200 transition md:bg-white md:text-purple-600 md:hover:bg-purple-300 md:hover:text-white rounded-full md:px-6 md:py-2",
        },
        {
          name: "Sign Up",
          path: "/signup",
          style: "text-lg bg-transparent text-white px-4 font-semibold hover:text-gray-200 transition md:bg-purple-600 text-white md:hover:bg-purple-700 rounded-full md:px-6 md:py-2",
        },
      ];

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-6 px-4 md:px-8">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl md:text-3xl font-bold cursor-pointer hover:text-gray-200 transition"
        >
          Event Booking Management
        </h1>

        {/* Menu Button */}
        <button
          className="text-2xl md:hidden text-white hover:text-gray-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-14 items-center">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className="text-lg font-medium hover:text-gray-300 transition"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* User Actions (Desktop) */}
        <div className="hidden md:flex gap-4 items-center">
          {authActions.map((action, index) =>
            action.path ? (
              <Link key={index} to={action.path} className={action.style}>
                {action.name}
              </Link>
            ) : (
              <button key={index} onClick={action.action} className={action.style}>
                {action.name}
              </button>
            )
          )}
        </div>
      </div>

      {/* Navigation Links (Mobile) */}
      {menuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  navigate(link.path);
                  setMenuOpen(false);
                }}
                className="text-lg font-medium hover:text-gray-300 transition"
              >
                {link.name}
              </button>
            ))}
            {authActions.map((action, index) =>
              action.path ? (
                <Link
                  key={index}
                  to={action.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex justify-center ${action.style}`}
                >
                  {action.name}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    action.action();
                    setMenuOpen(false);
                  }}
                  className={`text-lg font-medium hover:text-gray-300 transition`}
                >
                  {action.name}
                </button>
              )
            )}
          </div>
        </nav>
      )}
      {/* Logout Confirmation Modal */}
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
    </header>
  );
};

export default Navbar;
