import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UnforgettableParties = () => {
  const [events, setEvents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Fetch events and filter by type
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
        const filteredEvents = response.data.filter((event) =>
          event.eventType.some(
            (type) => type === "Party" || type === "Concert" || type === "Exhibition"
          )
        );
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Calculate distance using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleBookNow = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
          Exciting Parties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => {
            // Extract latitude and longitude from event's location
            const [longitude, latitude] = event.location?.coordinates || [];
            const distance =
              userLocation && latitude !== undefined && longitude !== undefined
                ? calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    latitude,
                    longitude
                  ).toFixed(1)
                : "N/A";

            return (
              <div
                key={event._id}
                className="relative group bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >
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
                    {event.offer}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {event.description || "Special Event"}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-800 font-semibold">₹{event.price}</p>
                    <p className="text-gray-500 text-sm">{distance} km</p>
                  </div>
                </div>

                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition duration-300">
                  <button
                    onClick={() => handleBookNow(event._id)}
                    className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full shadow-lg hover:bg-blue-500 transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UnforgettableParties;
