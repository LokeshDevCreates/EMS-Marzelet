import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../../../components/Footer";

const OrganizerProfile = () => {
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [tempImagePreview, setTempImagePreview] = useState(null);

  const organizerId = localStorage.getItem('organizerId');

  useEffect(() => {
    if (!organizerId) {
      setError('Organizer ID not found. Please login again.');
      setLoading(false);
      return;
    }

    const fetchOrganizer = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/organizers/${organizerId}`);
        setOrganizer(res.data);
        setFormData(res.data);
        if (res.data.profileImage) {
          setPreviewImage(`${import.meta.env.VITE_API_URL}/${res.data.profileImage}`);
        }
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizer();
  }, [organizerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "email" ? value.toLowerCase() : value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setTempImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const updateData = new FormData();

      // Append non-empty fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          updateData.append(key, key === "email" ? value.toLowerCase() : value);
        }
      });

      // Only append image if a new one is selected
      if (imageFile) {
        updateData.append('profileImage', imageFile);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/organizers/${organizerId}`,
        updateData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      setOrganizer(res.data);
      setPreviewImage(imageFile ? tempImagePreview : previewImage); // Keep old if no new image
      setTempImagePreview(null);
      setImageFile(null);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update profile');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600 font-medium">{error}</div>;
  }

  if (!organizer) return null;

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-12 mb-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <img
            src={
              isEditing
                ? (tempImagePreview || previewImage || '/default-avatar.png')
                : (previewImage || '/default-avatar.png')
            }
            alt="Organizer Avatar"
            className="w-28 h-28 rounded-full object-cover mb-4"
          />

          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4 text-sm"
            />
          )}

          <h1 className="text-2xl font-semibold text-gray-800 capitalize">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="text-center border rounded px-2 py-1"
              />
            ) : (
              organizer.name
            )}
          </h1>

          <p className="text-gray-600 text-sm mt-1 capitalize">
            {isEditing ? (
              <input
                type="text"
                name="profession"
                value={formData.profession || ''}
                onChange={handleChange}
                className="text-center border rounded px-2 py-1"
              />
            ) : (
              organizer.profession || 'Event Organizer'
            )}
          </p>

          <p className="text-blue-600 text-sm mt-0.5 capitalize">
            Organization Type:{' '}
            {isEditing ? (
              <input
                type="text"
                name="organizationType"
                value={formData.organizationType || ''}
                onChange={handleChange}
                className="border rounded px-2 py-1"
              />
            ) : (
              organizer.organizationType || 'N/A'
            )}
          </p>

          {/* Edit / Save Buttons */}
          <div className="mt-4 space-x-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setTempImagePreview(null);
                    setImageFile(null);
                    setFormData(organizer);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Organizer Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 text-gray-700">
            {[
              { label: 'Email', key: 'email' },
              { label: 'Phone', key: 'phone' },
              { label: 'Age', key: 'age' },
              { label: 'Organization Name', key: 'organizationName' },
              { label: 'Profession', key: 'profession' },
            ].map(({ label, key }) =>
              formData[key] !== undefined && (
                <div key={key}>
                  <p className="text-sm font-medium">{label}</p>
                  {isEditing ? (
                    <input
                      type={key === 'age' ? 'number' : 'text'}
                      name={key}
                      value={formData[key] || ''}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1"
                    />
                  ) : (
                    <p className={key === 'email' ? 'lowercase' : 'capitalize'}>
                      {organizer[key] || 'N/A'}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrganizerProfile;
