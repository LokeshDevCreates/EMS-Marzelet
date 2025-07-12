import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../../../components/Footer"
const OrganizerProfile = () => {
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizer();
  }, [organizerId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (!organizer) return null;

  return (
    <>
    <div className="max-w-4xl mx-auto px-6 py-12 mb-10">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <img
          src={
            organizer.profileImage
              ? `${import.meta.env.VITE_API_URL}/${organizer.profileImage}`
              : '/default-avatar.png'
          }
          alt="Organizer Avatar"
          className="w-28 h-28 rounded-full object-cover mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800 capitalize">{organizer.name}</h1>
        <p className="text-gray-600 text-sm mt-1 capitalize">
          {organizer.profession || 'Event Organizer'}
        </p>
        <p className="text-blue-600 text-sm mt-0.5 capitalize">
          Organization Type: {organizer.organizationType || 'N/A'}
        </p>
      </div>

      {/* Info Section */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Organizer Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 text-gray-700">
          <div>
            <p className="text-sm font-medium">Email</p>
            <p>{organizer.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Phone</p>
            <p>{organizer.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Age</p>
            <p>{organizer.age || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Organization Type</p>
            <p className="capitalize">{organizer.organizationType || 'N/A'}</p>
          </div>
          {organizer.organizationName && (
            <div>
              <p className="text-sm font-medium">Organization Name</p>
              <p>{organizer.organizationName}</p>
            </div>
          )}
          {organizer.profession && (
            <div>
              <p className="text-sm font-medium">Profession</p>
              <p>{organizer.profession}</p>
            </div>
          )}
        </div>

        {/* Description section */}
        {organizer.description && (
          <div className="mt-6">
            <p className="text-sm font-medium mb-1">Description</p>
            <p className="text-gray-700">{organizer.description}</p>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default OrganizerProfile;
