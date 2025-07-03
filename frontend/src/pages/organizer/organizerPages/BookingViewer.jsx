import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../context/UserContext";
import Footer from "../../../components/Footer"
const BookingViewer = () => {
  const { user } = useUser();
  const organizerId = user?._id || user?.id;
  const orgId=localStorage.getItem('organizerId')
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events created by this organizer
  useEffect(() => {
    const fetchEvents = async () => {
      if (!orgId) {
        setError("User ID not found. Please log in again.");
        setLoadingEvents(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/organizer/${orgId}`
        );
        setEvents(response.data.events || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load your events.");
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [orgId]);

  // Fetch all bookings related to this organizer
  useEffect(() => {
    const fetchBookings = async () => {
      if (!organizerId) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookings/organizer/${organizerId}/bookings`
        );
        setBookings(response.data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [organizerId]);

  const filteredBookings = selectedEventId
    ? bookings.filter((b) => b.eventId?._id === selectedEventId)
    : [];

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Organizer Dashboard – Your Events & Bookings
      </h2>

      {/* EVENT CARDS */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Your Events</h3>
        {loadingEvents ? (
          <div className="text-center py-10 text-gray-600">Loading events...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            You haven’t created any events yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {events.map((event) => (
              <div
                key={event._id}
                onClick={() => setSelectedEventId(event._id)}
                className={`cursor-pointer border p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all ${
                  selectedEventId === event._id ? "border-blue-500 shadow-md" : ""
                }`}
              >
                <img
                  src={event.eventImages?.[0]}
                  alt={event.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-800">{event.name}</h4>
                <p className="text-sm text-gray-500">
                  {event.date} | {event.startTime} – {event.endTime}
                </p>
             
                <p className="text-sm text-gray-600">
                  Booked Seats: <strong>{event.bookedSeats}</strong> / {event.seats}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* BOOKING DETAILS */}
      {selectedEventId && (
        <section>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Bookings for Selected Event
          </h3>
          {loadingBookings ? (
            <div className="text-center text-gray-600">Loading bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center text-gray-500">
              No bookings found for this event.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBookings.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition"
                >
                  <p className="text-gray-700">
                    <span className="font-semibold">Attendee:</span>{" "}
                    {booking.userId?.name || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span>{" "}
                    {booking.userId?.email || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Seats Booked:</span>{" "}
                    {booking.seats}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Amount Paid:</span> ₹
                    {booking.amountPaid}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Payment ID:</span>{" "}
                    {booking.paymentId}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Booking Time:</span>{" "}
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
    <Footer />
    </>
  );
};

export default BookingViewer;
