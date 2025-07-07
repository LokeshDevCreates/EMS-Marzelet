import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar"
const Profile = () => {
  const [attendee, setAttendee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const attendeeId = localStorage.getItem('attendeeId');

  useEffect(() => {
    if (!attendeeId) {
      setError('Attendee ID not found. Please login again.');
      setLoading(false);
      return;
    }

    const fetchAttendee = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/attendees/${attendeeId}`);
        setAttendee(res.data);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendee();
  }, [attendeeId]);

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

  if (!attendee) return null;

  return (
    <> 
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12 mb-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <img
            src={
              attendee.profileImage
                ? `${import.meta.env.VITE_API_URL}/${attendee.profileImage}`
                : '/default-avatar.png'
            }
            alt="Attendee Avatar"
            className="w-28 h-28 rounded-full object-cover mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-800 capitalize">{attendee.name}</h1>
          <p className="text-gray-600 text-sm mt-1 capitalize">
            {attendee.gender || 'Not specified'}
          </p>
        </div>

        {/* Info Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Attendee Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 text-gray-700">
            <div>
              <p className="text-sm font-medium">Email</p>
              <p>{attendee.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p>{attendee.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Age</p>
              <p>{attendee.age || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Gender</p>
              <p>{attendee.gender || 'N/A'}</p>
            </div>
          </div>

          {/* Address section */}
          {attendee.address && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-1">Address</h3>
              <p className="text-gray-700 capitalize">
                {attendee.address.street && `${attendee.address.street}, `}
                {attendee.address.city && `${attendee.address.city}, `}
                {attendee.address.state && `${attendee.address.state}, `}
                {attendee.address.country && `${attendee.address.country}, `}
                {attendee.address.zip}
              </p>
            </div>
          )}

          {/* Bio section */}
          {attendee.bio && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-1">Bio</h3>
              <p className="text-gray-700">{attendee.bio}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
