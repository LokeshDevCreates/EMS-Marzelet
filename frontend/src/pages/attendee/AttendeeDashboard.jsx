import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const events = [
  // Sample event data as provided
  {
    title: "Royal Wedding Expo",
    category: "Marriage",
    description: "Plan your dream marriage ceremony.",
    image: "https://i.ytimg.com/vi/EpZY2bvZ_aY/maxresdefault.jpg",
    venueCoords: { lat: 13.0639, lng: 80.2436 }
  },
  {
    title: "National Football Final",
    category: "Sports",
    description: "Cheer for your favourite team!",
    image: "https://images.moneycontrol.com/static-mcnews/2022/12/AP22352513324776.jpg",
    venueCoords: { lat: 13.0726, lng: 80.2611 }
  }
  // Add other events here
];

export default function UserEventBooking() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const handleViewDirections = (venueCoords) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
          const destination = `${venueCoords.lat},${venueCoords.lng}`;
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
          window.open(mapsUrl, "_blank");
        },
        () => {
          alert("Location access denied. Enable location to view directions.");
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  const filteredEvents = events.filter(
    (evt) =>
      evt.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || evt.category === category)
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-800 border-b border-gray-700">
        <div className="font-bold text-lg">👤 My Profile</div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            {[...new Set(events.map((e) => e.category))].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Section */}
      <header className="flex flex-col justify-center items-center h-64 text-center bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1601987077686-5c0aeefc65a1?auto=format&fit=crop&w=1950&q=80')]">
        <h1 className="text-4xl font-bold mb-2 animate-typing overflow-hidden border-r-2 whitespace-nowrap text-ellipsis">
          Welcome to Our Event Booking Platform
        </h1>
        <p className="text-lg opacity-80">Find the perfect event for any occasion</p>
      </header>

      {/* Event Grid */}
      <div className="grid gap-6 p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredEvents.map((evt, idx) => (
          <div
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105"
            key={idx}
          >
            <img src={evt.image || "https://placehold.co/600x400?text=No+Image"} alt={evt.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{evt.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{evt.description}</p>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => navigate("/booking")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
                <button
                  onClick={() => handleViewDirections(evt.venueCoords)}
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                  📍 View Directions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
