import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../../components/Footer"
const OrganizerBankDetails = () => {
  const [formData, setFormData] = useState({
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const organizerId = localStorage.getItem("organizerId");
      const eventData = JSON.parse(localStorage.getItem("pendingEventData"));

      if (!eventData) {
        toast.error("Event data not found. Please create the event again.");
        setLoading(false);
        return;
      }

      // 1. Submit bank details
      await axios.post('http://localhost:5000/api/bank-details', {
        ...formData,
        organizerId,
      });

      // 2. Submit event
      await axios.post('http://localhost:5000/api/events', eventData);

      // 3. Cleanup & Success
      localStorage.removeItem('pendingEventData');
      toast.success('🎉 Event Created Successfully!');
      setTimeout(() => {
        navigate('/organizer-dashboard');
      }, 2000);

    } catch (error) {
      console.error('Submission error:', error);
      toast.error('❌ Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Bank Details</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please enter your bank information to receive event earnings.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Account Holder Name</label>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white rounded ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {loading ? 'Submitting...' : 'Submit & Create Event'}
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default OrganizerBankDetails;
