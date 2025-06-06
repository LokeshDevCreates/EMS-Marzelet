import React, { useState } from "react";

const sampleEvents = [
  {
    id: 1,
    title: "Marriage and Wedding Event",
    date: "2025-07-15",
    location: "New Delhi",
    type: "Wedding",
    image: "/images/event1.jpg",
  },
  {
    id: 2,
    title: "Music Fest 2025",
    date: "2025-08-10",
    location: "Mumbai",
    type: "Music",
    image: "/images/event2.jpg",
  },
  {
    id: 3,
    title: "Startup Pitching Event",
    date: "2025-09-05",
    location: "Bangalore",
    type: "Business",
    image: "/images/event3.jpg",
  },
  {
    id: 4,
    title: "Tech Conference",
    date: "2025-09-15",
    location: "Hyderabad",
    type: "Technology",
    image: "/images/event1.jpg",
  },
  {
    id: 5,
    title: "Food Carnival",
    date: "2025-10-01",
    location: "Chennai",
    type: "Food",
    image: "/images/event2.jpg",
  },
];

const EventsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const today = new Date().toISOString().split("T")[0];

  const filteredEvents = sampleEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "All" || event.type === selectedType;

    const matchesDate = !selectedDate || event.date === selectedDate;

    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Explore Events
        </h1>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event name or location"
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={today}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Event Type Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="Wedding">Wedding</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
            <option value="Technology">Technology</option>
            <option value="Food">Food</option>
          </select>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    📅 {event.date} | 📍 {event.location}
                  </p>
                  <p className="text-gray-600 text-sm">🎫 Type: {event.type}</p>
                  <button
                    onClick={() => alert(`Booking ${event.title}`)}
                    className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-lg shadow hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No events found. Try adjusting the filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
