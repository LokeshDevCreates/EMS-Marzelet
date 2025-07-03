// Events.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrendingEvents from "./TrendingEvents";
import UnforgettableParties from "./UnforgettabaleParties";
import Sports from "./Sports";

const fetchAllEvents = async () => {
  const res = await fetch("http://localhost:5000/api/events");
  const data = await res.json();
  return data;
};

const Events = ({ location,authActions, isMenuOpen, setIsMenuOpen }) => {
  const [activeTab, setActiveTab] = useState("Exclusive Events");
  const [searchText, setSearchText] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();

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

      <section className="py-8 bg-[#E9F1FA]">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-8">
            {[
              { name: "Exclusive Events", icon: "🎉" },
              { name: "Unforgettable Parties", icon: "🎶" },
              { name:"Sports",icon:"⚽"}
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

      {activeTab === "Exclusive Events" && <TrendingEvents />}
      {activeTab === "Sports" && <Sports />}
      {activeTab === "Unforgettable Parties" && <UnforgettableParties />}
    </>
  );
};

export default Events;
