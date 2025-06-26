import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Mail, PhoneCall, Copy, Navigation } from "lucide-react";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [address, setAddress] = useState("Fetching location...");
  const { user } = useUser();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    if (event?.location?.coordinates?.length === 2) {
      const [lng, lat] = event.location.coordinates;
      const fetchAddress = async () => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
          const data = await response.json();
          setAddress(data.display_name || "Unknown Location");
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          setAddress("Unknown Location");
        }
      };
      fetchAddress();
    }
  }, [event]);

  const handleBookNow = () => {
    if (!user) {
      navigate("/login", { state: { from: `/events/${eventId}` } });
    } else {
      console.log("Booking process started for:", eventId);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard");
  };

  if (!event) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/")}>
            Home
          </span>{" "}
          / Event Details
        </nav>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">{event.name}</h1>
            <p className="text-lg text-gray-600 mt-2">
              {event.eventType?.join(", ")} |{" "}
              <span className="text-gray-700 font-medium">Organized by: {event.organizerName}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">{address}</p>
            <p className="text-lg text-gray-700 mt-1">Prize: ₹{event.price}</p>
            {event.offer && (
              <p className="text-green-600 font-semibold mt-1">{event.offer}</p>
            )}
            <div className="flex items-center gap-3">
                <PhoneCall className="text-red-500" size={20} />
                <a href={`tel:+91${event.organizerPhone}`} className="text-blue-600 underline">
                  +91 {event.organizerPhone}
                </a>
            </div>
            <div className="flex items-center gap-3">
                <Mail className="text-green-500" size={20} />
                <a href={`mailto:${event.organizerEmail}`} className="text-blue-600 underline">
                  {event.organizerEmail}
                </a>
              </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Back
          </button>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {event.eventImages?.length > 0 ? (
            event.eventImages.map((image, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden shadow-md">
                <img
                  src={image}
                  alt={`Event ${index + 1}`}
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No images available for this event.</p>
          )}
        </div>

        {/* Event Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Event Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-600">📅 Date</h4>
                <p className="text-gray-800 text-lg">{event.date}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-600">⏰ Time</h4>
                <p className="text-gray-800 text-lg">
                  {event.startTime} - {event.endTime}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-600">🪑 Seats Available</h4>
                <p className="text-gray-800 text-lg">
                  {event.seats - event.bookedSeats} / {event.seats}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-600">📖 Description</h4>
                <p className="text-gray-700 text-lg">{event.description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-600">🎯 Arrangements</h4>
                <p className="text-gray-700 text-lg">{event.arrangements?.join(", ") || "N/A"}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-600">🍴 Food Items</h4>
                <p className="text-gray-700 text-lg">{event.foodItems?.join(", ") || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Organizer + Direction */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
          {/* Direction Map - 3/5 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:col-span-3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Direction</h2>
            <div className="rounded-md overflow-hidden shadow">
              <iframe
                width="100%"
                height="250"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${event.location.coordinates[0] - 0.01},${event.location.coordinates[1] - 0.01},${event.location.coordinates[0] + 0.01},${event.location.coordinates[1] + 0.01}&layer=mapnik&marker=${event.location.coordinates[1]},${event.location.coordinates[0]}`}
                frameBorder="0"
                scrolling="no"
                title="Map Location"
              ></iframe>
            </div>
            <p className="text-gray-700 mt-2">{address}</p>
            <div className="flex mt-4 gap-4">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 border border-gray-300"
              >
                <Copy size={16} /> Copy
              </button>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${event.location.coordinates[1]},${event.location.coordinates[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded bg-red-100 hover:bg-red-200 border border-red-400 text-red-700"
              >
                <Navigation size={16} /> Direction
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-end items-center">
          <button
            onClick={handleBookNow}
            className="bg-blue-600 text-white text-lg px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
