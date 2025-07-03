// Events.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrendingEvents from "../../../components/TrendingEvents";
import UnforgettableParties from "../../../components/UnforgettabaleParties";
import Sports from "../../../components/Sports"
import Footer from "../../../components/Footer"
const fetchAllEvents = async () => {
  const res = await fetch("http://localhost:5000/api/events");
  const data = await res.json();
  return data;
};

const Events = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Exclusive Events");
  const [location, setLocation] = useState("Chennai");
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
          fetch(`http://localhost:5000/api/maps/geocode?lat=${latitude}&lng=${longitude}`)
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

  const handleBookNow = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="bg-[#E9F1FA] py-6 px-4 md:px-8 flex justify-center">
        <div className="w-full max-w-4xl relative">
          <input
            type="text"
            placeholder="Search for parties, marriages, events..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className=" ml-14 md:ml-0 w-80 md:w-full border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00ABE4] shadow-sm"
          />
          <div className="absolute top-4 right-2 text-gray-500 text-sm">
            📍 {location}
          </div>
          {filteredEvents.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white border rounded shadow-lg z-50 max-h-72 overflow-y-auto">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id || index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleBookNow(event._id)}
                >
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
      </div>

      {/* Hero Tabs */}
      <section className="py-8 bg-[#E9F1FA]">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-8">
            {[
              { name: "Exclusive Events", icon: "🎉" },
              { name: "Unforgettable Parties", icon: "🎶" },
              { name: "Sports", icon: "⚽" }, 
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
      {activeTab === "Sports" && <Sports />}
      {activeTab === "Unforgettable Parties" && <UnforgettableParties />}
      <Footer />
    </>
  );
};

export default Events;
