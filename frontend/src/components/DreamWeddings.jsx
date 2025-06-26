import React, { useEffect, useState } from "react";
import axios from "axios";

const DreamWeddings = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        // Filter events to include only 'Wedding' or 'Family' types
        const filteredEvents = response.data.filter((event) =>
          event.eventType.some((type) => type === "Wedding" || type === "Family")
        );
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
          Weddings & Family Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => (
            <div
              key={event._id}
              className="relative group bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={
                    Array.isArray(event.eventImages) && event.eventImages.length > 0
                      ? event.eventImages[0]
                      : "/default-event-image.jpg"
                  }
                  alt={event.name || "Event"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                  {Math.floor(Math.random() * 50) + 10}% OFF
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {event.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {event.description || "Special Event"}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-800 font-semibold">
                    ₹{event.seats * 100} for two
                  </p>
                  <p className="text-gray-500 text-sm">
                    {Math.floor(Math.random() * 5) + 1} km
                  </p>
                </div>
              </div>
              {/* Hover Button */}
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition duration-300">
                <button className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full shadow-lg hover:bg-blue-500 transition-all">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DreamWeddings;
