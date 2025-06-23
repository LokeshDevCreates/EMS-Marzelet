import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.eventType || !formData.date) {
      alert('Please fill all fields.');
      return;
    }

    navigate('/payment', { state: formData });
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold text-blue-800 mb-6">Event Booking Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col font-semibold text-gray-700">
          Name:
          <input 
            type="text" 
            name="name" 
            onChange={handleChange} 
            value={formData.name} 
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col font-semibold text-gray-700">
          Phone Number:
          <input 
            type="tel" 
            name="phone" 
            onChange={handleChange} 
            value={formData.phone} 
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <label className="flex flex-col font-semibold text-gray-700">
          Event Type:
          <select 
            name="eventType" 
            onChange={handleChange} 
            value={formData.eventType} 
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="Marriage">Marriage</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Feast">Feast</option>
          </select>
        </label>
        <label className="flex flex-col font-semibold text-gray-700">
          Date:
          <input 
            type="date" 
            name="date" 
            onChange={handleChange} 
            value={formData.date} 
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <button 
          type="submit" 
          className="py-3 bg-blue-500 text-white text-lg font-medium rounded-full hover:bg-blue-600 transition-colors"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
