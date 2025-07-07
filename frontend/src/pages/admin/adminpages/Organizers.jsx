import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Organizers = () => {
  const [organizers, setOrganizers] = useState([]);
  const [filteredOrganizers, setFilteredOrganizers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newOrganizer, setNewOrganizer] = useState({
    name: "",
    email: "",
    organization: "",
    password: "",
  });
  const [editOrganizer, setEditOrganizer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Fetch organizers
  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/organizers`);
        setOrganizers(response.data);
        setFilteredOrganizers(response.data);
      } catch (error) {
        console.error("Error fetching organizers:", error);
      }
    };

    fetchOrganizers();
  }, []);

  // Create new organizer
  const handleAddOrganizer = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/organizers/register`,
        newOrganizer
      );
      setOrganizers([...organizers, response.data]);
      setFilteredOrganizers([...organizers, response.data]);
      toast.success("Organizer added successfully!");
      setNewOrganizer({ name: "", email: "", organization: "", password: "" });
      setShowAddForm(false);
    } catch (error) {
      toast.error("Failed to add organizer");
      console.error(error);
    }
  };

  // Update organizer
  const handleUpdateOrganizer = async (id) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/organizers/${id}`,
        editOrganizer
      );
      setOrganizers(
        organizers.map((org) =>
          org._id === id ? { ...org, ...response.data } : org
        )
      );
      setFilteredOrganizers(
        filteredOrganizers.map((org) =>
          org._id === id ? { ...org, ...response.data } : org
        )
      );
      toast.success("Organizer updated successfully!");
      setEditOrganizer(null);
    } catch (error) {
      toast.error("Failed to update organizer");
      console.error(error);
    }
  };

  // Confirm deletion
  const handleDeleteOrganizer = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/organizers/${deleteConfirmId}`);
      const updatedOrganizers = organizers.filter((org) => org._id !== deleteConfirmId);
      setOrganizers(updatedOrganizers);
      setFilteredOrganizers(updatedOrganizers);
      toast.success("Organizer deleted successfully!");
      setDeleteConfirmId(null);
    } catch (error) {
      toast.error("Failed to delete organizer");
      console.error(error);
    }
  };

  // Search/filter functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredOrganizers(
      organizers.filter(
        (org) =>
          org.name.toLowerCase().includes(term) ||
          org.email.toLowerCase().includes(term) ||
          org.organization.toLowerCase().includes(term)
      )
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <ToastContainer />
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900">
        Organizer Management
      </h1>

      {/* Add Organizer Button */}
      <div className="flex justify-end mb-4 ">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add Organizer"}
        </button>
      </div>

      {/* Add Organizer Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="font-semibold text-gray-800 mb-3">Add New Organizer</h2>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border px-3 py-2 rounded w-full sm:w-1/4"
              value={newOrganizer.name}
              onChange={(e) =>
                setNewOrganizer({ ...newOrganizer, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="border px-3 py-2 rounded w-full sm:w-1/4"
              value={newOrganizer.email}
              onChange={(e) =>
                setNewOrganizer({ ...newOrganizer, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Organization"
              className="border px-3 py-2 rounded w-full sm:w-1/4"
              value={newOrganizer.organization}
              onChange={(e) =>
                setNewOrganizer({
                  ...newOrganizer,
                  organization: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="border px-3 py-2 rounded w-full sm:w-1/4"
              value={newOrganizer.password}
              onChange={(e) =>
                setNewOrganizer({ ...newOrganizer, password: e.target.value })
              }
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
              onClick={handleAddOrganizer}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Search Organizer */}
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

      {/* Organizers Table */}
        <div className="overflow-hidden">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200 text-gray-800 text-sm md:text-lg">
              <tr>
                <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">Name</th>
                <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">Organization</th>
                <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">Email</th>
                <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrganizers.map((org) => (
                <tr
                  key={org._id}
                  className="text-center even:bg-gray-50 odd:bg-white text-xs md:text-base"
                >
                  <td className="border border-gray-300 px-2 py-1">
                    {editOrganizer && editOrganizer._id === org._id ? (
                      <input
                        type="text"
                        value={editOrganizer.name}
                        className="border px-1 md:px-2 py-1 rounded w-full text-xs md:text-sm"
                        onChange={(e) =>
                          setEditOrganizer({ ...editOrganizer, name: e.target.value })
                        }
                      />
                    ) : (
                      org.name
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {editOrganizer && editOrganizer._id === org._id ? (
                      <input
                        type="text"
                        value={editOrganizer.organization}
                        className="border px-1 md:px-2 py-1 rounded w-full text-xs md:text-sm"
                        onChange={(e) =>
                          setEditOrganizer({
                            ...editOrganizer,
                            organization: e.target.value,
                          })
                        }
                      />
                    ) : (
                      org.organization
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">{org.email}</td>
                  <td className="border border-gray-300 px-2 py-1 space-x-1 md:space-x-2">
                    {editOrganizer && editOrganizer._id === org._id ? (
                      <>
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                          onClick={() => handleUpdateOrganizer(org._id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                          onClick={() => setEditOrganizer(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                          onClick={() => setEditOrganizer(org)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                          onClick={() => setDeleteConfirmId(org._id)}
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
              Are you sure you want to delete this organizer?
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
                onClick={handleDeleteOrganizer}
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

export default Organizers;
