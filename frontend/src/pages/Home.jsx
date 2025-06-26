import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import TrendingEvents from "../components/TrendingEvents";
import DreamWeddings from "../components/DreamWeddings";
import UnforgettableParties from "../components/UnforgettabaleParties";
import Footer from "../components/Footer";
import Login from "./Login";
import Signup from "./Signup";

// Dummy API function (replace with actual one)
const fetchAllEvents = async () => {
  const res = await fetch("http://localhost:5000/api/events");
  const data = await res.json();
  return data;
};

const Home = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Exclusive Events");
  const [location, setLocation] = useState("Chennai");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // 👇 Search-related state
  const [searchText, setSearchText] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      setLocation(storedLocation);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDm3vOQHi8MKle_4FjH_U_1dLNvtbtmthk`
          )
            .then((response) => response.json())
            .catch((error) => console.error("Error fetching location:", error));
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Salem");
        }
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("location", location);
  }, [location]);

  // 👇 Fetch all events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await fetchAllEvents();
        setAllEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // 👇 Filter events based on search text
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredEvents([]);
      return;
    }
    const lowerSearch = searchText.toLowerCase();
    const filtered = allEvents.filter((event) =>
      event.name.toLowerCase().includes(lowerSearch)
    );
    setFilteredEvents(filtered);
  }, [searchText, allEvents]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const authActions = user
    ? [
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
            else if (user?.role === "Attendee") navigate("/attendee-dashboard");
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
        {/* Header */}
        <header className="bg-[#E9F1FA] shadow-md">
          <div className="container mx-auto px-8 py-4 flex justify-between items-center">
            <h1
              className="text-3xl font-extrabold text-[#00ABE4] cursor-pointer tracking-wide"
              onClick={() => navigate("/")}
            >
              Evento
            </h1>

            <button
              className="text-3xl md:hidden text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "✖" : "☰"}
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-4 flex-grow mx-10 relative">
              <input
                type="text"
                placeholder="Search for parties, marriages, events..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00ABE4] shadow-sm"
              />
              <div className="relative w-60">
                <button className="w-full text-left bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 shadow-sm flex items-center justify-between">
                  📍 {location}
                </button>
              </div>

             {/* 🔍 Search Results Dropdown */}
                {filteredEvents.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white border rounded shadow-lg z-50 max-h-72 overflow-y-auto">
                    {filteredEvents.map((event, index) => (
                      <div
                        key={event.id || index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => navigate(`/event/${event.id}`)}
                      >
                        {/* Event Image */}
                        <img
                          src={
                            Array.isArray(event.eventImages) && event.eventImages.length > 0
                              ? event.eventImages[0]
                              : "/default-event-image.jpg"
                          }
                          alt={event.name}
                          className="w-12 h-12 object-cover rounded-md mr-4"
                        />
                        <div>
                          <div className="font-semibold">{event.name}</div>
                          <div className="text-sm text-gray-500">{event.date || "Date not available"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {authActions.map((action, index) => (
                <button key={index} onClick={action.action} className={action.style}>
                  {action.name}
                </button>
              ))}
            </div>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden bg-[#E9F1FA] py-4 px-6">
              <div className="flex flex-col items-center space-y-4">
                {authActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsMenuOpen(false);
                      action.action();
                    }}
                    className="text-lg font-medium text-[#00ABE4] hover:underline"
                  >
                    {action.name}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </header>

        {/* Hero Tabs */}
        <section className="py-8 bg-[#E9F1FA]">
          <div className="container mx-auto text-center">
            <div className="flex justify-center space-x-8">
              {[
                { name: "Exclusive Events", icon: "🎉" },
                { name: "Dream Weddings", icon: "💍" },
                { name: "Unforgettable Parties", icon: "🎶" },
              ].map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex flex-col items-center px-6 py-2 rounded-lg text-lg font-medium ${
                    activeTab === tab.name
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  <div className="text-2xl">{tab.icon}</div>
                  <span>{tab.name}</span>
                  {activeTab === tab.name && (
                    <div className="h-1 w-full bg-blue-600 rounded mt-1"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        {activeTab === "Exclusive Events" && <TrendingEvents />}
        {activeTab === "Dream Weddings" && <DreamWeddings />}
        {activeTab === "Unforgettable Parties" && <UnforgettableParties />}

        {/* Logout Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Logout
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout? You will need to log in again
                for further booking.
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
