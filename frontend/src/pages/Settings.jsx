import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Settings = () => {
  const navigate = useNavigate();
  const attendeeId = localStorage.getItem("attendeeId");
  const resetEmail = localStorage.getItem("attendeeEmail") || "";

  const [attendee, setAttendee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    bio: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zip: ""
    },
    profileImage: null,
  });

  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    if (!attendeeId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/attendees/${attendeeId}`);
        setAttendee(res.data);
        setExistingImageUrl(res.data.profileImage || "");
        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
          age: res.data.age || "",
          gender: res.data.gender || "",
          bio: res.data.bio || "",
          address: res.data.address || {},
          profileImage: null
        });
      } catch (err) {
        toast.error("Failed to load attendee data");
        console.error(err);
      }
    };

    fetchData();
  }, [attendeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "address") {
          Object.entries(value).forEach(([subKey, subVal]) =>
            form.append(`address[${subKey}]`, subVal)
          );
        } else if (key === "profileImage" && value) {
          form.append("profileImage", value);
        } else {
          form.append(key, value);
        }
      });

      // Include existing image URL if no new image is uploaded
      if (!formData.profileImage && existingImageUrl) {
        form.append("existingImage", existingImageUrl);
      }

      await axios.put(`${import.meta.env.VITE_API_URL}/api/attendees/${attendeeId}`, form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Reset failed");
      }

      toast.success("Password reset email sent!");
      setIsResetModalOpen(false);
    } catch (error) {
      console.error("Reset error:", error);
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!attendee) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 px-4 py-10 md:px-20 relative">
       {/* 🔘 Logout Button Top Right Only */}
          <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition text-sm"
            >
              Logout
            </button>
          </div>
        <h1 className="text-3xl text-center font-bold mb-10 text-blue-600">Settings</h1>

        {/* 📝 Edit Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-2xl mx-auto"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Edit Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="p-3 border rounded" required />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="p-3 border rounded" required />
            <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" type="number" className="p-3 border rounded" />
            <select name="gender" value={formData.gender} onChange={handleChange} className="p-3 border rounded">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full p-3 border rounded mb-4"
          />

          <h3 className="font-semibold text-gray-700 mt-6 mb-2">Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input name="address.street" value={formData.address?.street || ''} onChange={handleChange} placeholder="Street" className="p-3 border rounded" />
            <input name="address.city" value={formData.address?.city || ''} onChange={handleChange} placeholder="City" className="p-3 border rounded" />
            <input name="address.state" value={formData.address?.state || ''} onChange={handleChange} placeholder="State" className="p-3 border rounded" />
            <input name="address.country" value={formData.address?.country || ''} onChange={handleChange} placeholder="Country" className="p-3 border rounded" />
            <input name="address.zip" value={formData.address?.zip || ''} onChange={handleChange} placeholder="ZIP Code" className="p-3 border rounded" />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-700" />
            <div className="mt-2">
              <img
                src={
                  formData.profileImage
                    ? URL.createObjectURL(formData.profileImage)
                    : existingImageUrl
                    ? `${import.meta.env.VITE_API_URL}/${existingImageUrl}`
                    : "/default-avatar.png"
                }
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border"
              />
            </div>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded">
            Save Changes
          </button>
          {/* 🔐 Reset Password Section */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Need to reset your password?</h3>
          <p className="text-sm text-gray-600 mb-3">
            If you've forgotten your password or want to change it for security reasons, you can request a reset email.
          </p>
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-5 py-2 rounded-md transition font-medium text-sm"
          >
            Send Password Reset Email
          </button>
        </div>
        </form>
      </div>
      

      {/* 🔐 Reset Password Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Reset Password</h3>
            <input
              type="email"
              value={resetEmail}
              disabled
              className="border w-full p-3 mb-4 rounded bg-gray-100 text-sm"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handlePasswordReset}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
              >
                Send Reset Email
              </button>
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚪 Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You’ll need to log in again.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Settings;
