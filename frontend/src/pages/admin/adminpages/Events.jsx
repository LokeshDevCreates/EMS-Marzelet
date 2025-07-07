import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEvent, setNewEvent] = useState({
    name: "",
    venueId: "",
    organizerId: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    arrangements: [],
    foodItems: [],
    seats: 0,
  });
  const [editEvent, setEditEvent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Create new event
  const handleAddEvent = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events`,
        newEvent
      );
      setEvents([...events, response.data]);
      setFilteredEvents([...events, response.data]);
      toast.success("Event added successfully!");
      setNewEvent({
        name: "",
        venueId: "",
        organizerId: "",
        date: "",
        startTime: "",
        endTime: "",
        description: "",
        arrangements: [],
        foodItems: [],
        seats: 0,
      });
      setShowAddForm(false);
    } catch (error) {
      toast.error("Failed to add event");
      console.error(error);
    }
  };

  // Update event
  const handleUpdateEvent = async (id) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        editEvent
      );
      setEvents(
        events.map((evt) =>
          evt._id === id ? { ...evt, ...response.data } : evt
        )
      );
      setFilteredEvents(
        filteredEvents.map((evt) =>
          evt._id === id ? { ...evt, ...response.data } : evt
        )
      );
      toast.success("Event updated successfully!");
      setEditEvent(null);
    } catch (error) {
      toast.error("Failed to update event");
      console.error(error);
    }
  };

  // Confirm deletion
  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${deleteConfirmId}`);
      const updatedEvents = events.filter((evt) => evt._id !== deleteConfirmId);
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
      toast.success("Event deleted successfully!");
      setDeleteConfirmId(null);
    } catch (error) {
      toast.error("Failed to delete event");
      console.error(error);
    }
  };

  // Search/filter functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredEvents(
      events.filter(
        (evt) =>
          evt.name.toLowerCase().includes(term) ||
          evt.description.toLowerCase().includes(term) ||
          evt.date.toLowerCase().includes(term)
      )
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <ToastContainer />
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900">
        Event Management
      </h1>

      {/* Add Event Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add Event"}
        </button>
      </div>

      {/* Add Event Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="font-semibold text-gray-800 mb-3">Add New Event</h2>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border px-3 py-2 rounded w-full sm:w-1/3"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Venue ID"
              className="border px-3 py-2 rounded w-full sm:w-1/3"
              value={newEvent.venueId}
              onChange={(e) =>
                setNewEvent({ ...newEvent, venueId: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Organizer ID"
              className="border px-3 py-2 rounded w-full sm:w-1/3"
              value={newEvent.organizerId}
              onChange={(e) =>
                setNewEvent({ ...newEvent, organizerId: e.target.value })
              }
            />
            <input
              type="date"
              className="border px-3 py-2 rounded w-full sm:w-1/3"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
            <input
              type="time"
              placeholder="Start Time"
              className="border px-3 py-2 rounded w-full sm:w-1/3"
              value={newEvent.startTime}
              onChange={(e) =>
                setNewEvent({ ...newEvent, startTime: e.target.value })
              }
            />
            <input
              type="time"
              placeholder="End Time"
              className="border px-3 py-2 rounded w-full sm:w-1/3"
              value={newEvent.endTime}
              onChange={(e) =>
                setNewEvent({ ...newEvent, endTime: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="border px-3 py-2 rounded w-full sm:w-2/3"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Seats"
              className="border px-3 py-2 rounded w-full sm:w-1/3"
              value={newEvent.seats}
              onChange={(e) =>
                setNewEvent({ ...newEvent, seats: Number(e.target.value) })
              }
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
              onClick={handleAddEvent}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Search Event */}
      <div className="mb-4 relative mr-20 sm:mr-0">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 w-full rounded pl-10"
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="absolute top-3 left-3 text-gray-500">
          <i className="fas fa-search"></i>
        </span>
      </div>

      {/* Events Table */}
      <div className="overflow-hidden">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-gray-800 text-sm md:text-lg">
            <tr>
              <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">Name</th>
              <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">Date</th>
              <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">Seats</th>
              <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">Arrangements</th>
              <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">Start Time</th>
              <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">End Time</th>
              <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((evt) => (
              <tr
                key={evt._id}
                className="text-center even:bg-gray-50 odd:bg-white text-xs md:text-base"
              >
                <td className="border border-gray-300 px-2 py-1">
                  {editEvent && editEvent._id === evt._id ? (
                    <input
                      type="text"
                      value={editEvent.name}
                      className="border px-1 md:px-2 py-1 rounded w-full text-xs md:text-sm"
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, name: e.target.value })
                      }
                    />
                  ) : (
                    evt.name
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {editEvent && editEvent._id === evt._id ? (
                    <input
                      type="date"
                      value={editEvent.date}
                      className="border px-1 md:px-2 py-1 rounded w-full text-xs md:text-sm"
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, date: e.target.value })
                      }
                    />
                  ) : (
                    evt.date
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {editEvent && editEvent._id === evt._id ? (
                    <input
                      type="number"
                      value={editEvent.seats}
                      className="border px-1 md:px-2 py-1 rounded w-full text-xs md:text-sm"
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, seats: Number(e.target.value) })
                      }
                    />
                  ) : (
                    evt.seats
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {editEvent && editEvent._id === evt._id ? (
                    <input
                      type="text"
                      value={editEvent.arrangements}
                      className="border px-1 md:px-2 py-1 rounded w-full text-xs md:text-sm"
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, arrangements: e.target.value })
                      }
                    />
                  ) : (
                    evt.arrangements.join(", ")
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {editEvent && editEvent._id === evt._id ? (
                    <input
                      type="number"
                      value={editEvent.startTime}
                      className="border px-1 md:px-2 py-1 rounded w-full text-xs md:text-sm"
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, startTime: Number(e.target.value) })
                      }
                    />
                  ) : (
                    evt.startTime
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {editEvent && editEvent._id === evt._id ? (
                    <input
                      type="number"
                      value={editEvent.endTime}
                      className="border px-1 md:px-2 py-1 rounded w-full text-xs md:text-sm"
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, endTime: Number(e.target.value) })
                      }
                    />
                  ) : (
                    evt.endTime
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-1 space-x-1 md:space-x-2">
                  {editEvent && editEvent._id === evt._id ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                        onClick={() => handleUpdateEvent(evt._id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                        onClick={() => setEditEvent(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                        onClick={() => setEditEvent(evt)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                        onClick={() => setDeleteConfirmId(evt._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this event?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteEvent}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;