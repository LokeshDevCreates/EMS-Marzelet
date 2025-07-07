import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import AttendeeSchema from '../pages/AttendeeSchema';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"
const AttendeeForm = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const emailFromStorage = localStorage.getItem('attendeeEmail') || '';
  console.log(gender)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AttendeeSchema),
  });

  const watchGender = watch('gender');

  useEffect(() => {
    setGender(watchGender);
  }, [watchGender]);

  useEffect(() => {
    setValue('email', emailFromStorage);
  }, [emailFromStorage, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (let key in data) {
        if (key === 'profileImage') {
          formData.append('profileImage', data.profileImage[0]);
        } else if (key === 'address') {
          for (let field in data.address) {
            formData.append(`address[${field}]`, data.address[field]);
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/attendees/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // 🟢 Get full attendee data by email
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/attendees/by-email/${data.email}`);

      localStorage.setItem('attendeeId', response.data._id);

      toast.success('Registration successful!');
      reset();
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
        <ToastContainer />
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Complete Your Profile
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input {...register('name')} placeholder="Enter Full Name" className="input w-full" />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

            <div>
              <label className="block font-medium mb-1">Age</label>
              <input {...register('age')} placeholder="Enter Age" className="input w-full" />
              <p className="text-red-500 text-sm">{errors.age?.message}</p>
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                {...register('email')}
                disabled
                placeholder="Enter Email Address"
                className="input w-full bg-gray-100"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input {...register('phone')} placeholder="Enter Phone Number" className="input w-full" />
              <p className="text-red-500 text-sm">{errors.phone?.message}</p>
            </div>

            <div>
              <label className="block font-medium mb-1">Gender</label>
              <select {...register('gender')} className="input w-full">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <p className="text-red-500 text-sm">{errors.gender?.message}</p>
            </div>

            <div>
              <label className="block font-medium mb-1">Bio (optional)</label>
              <textarea
                {...register('bio')}
                placeholder="Short description about yourself"
                rows={3}
                className="input w-full"
              />
              <p className="text-red-500 text-sm">{errors.bio?.message}</p>
            </div>

            {/* Address Fields */}
            <div>
              <label className="block font-medium mb-1">Street</label>
              <input {...register('address.street')} className="input w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">City</label>
                <input {...register('address.city')} className="input w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">State</label>
                <input {...register('address.state')} className="input w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Country</label>
                <input {...register('address.country')} className="input w-full" />
              </div>
              <div>
                <label className="block font-medium mb-1">Zip</label>
                <input {...register('address.zip')} className="input w-full" />
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block font-medium mb-1">Profile Image (Optional)</label>
              <input type="file" {...register('profileImage')} className="input w-full" />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  const email = emailFromStorage || watch('email');
                  reset();
                  setValue('email', email);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-medium"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AttendeeForm;
