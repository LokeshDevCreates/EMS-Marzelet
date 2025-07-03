import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrganizerSchema from '../organizerSchema/OrganizerSchema';
import { useNavigate } from 'react-router-dom';
import Footer from "../../../components/Footer"
const OrganizerForm = () => {
  const navigate = useNavigate();
  const [orgType, setOrgType] = useState('');
  const emailFromStorage = localStorage.getItem('organizerEmail') || '';

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(OrganizerSchema),
  });

  const watchOrgType = watch('organizationType');

  useEffect(() => {
    setOrgType(watchOrgType);
  }, [watchOrgType]);

  useEffect(() => {
    setValue('email', emailFromStorage);
  }, [emailFromStorage, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (let key in data) {
        if (key === 'profileImage') {
          formData.append('profileImage', data.profileImage[0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      await axios.post('http://localhost:5000/api/organizers/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // 🟢 Fetch organizer by email to get full data
      const response = await axios.get(`http://localhost:5000/api/organizers/by-user/${data.email}`);
      const organizerId = response.data._id;

      // ✅ Save organizer ID to localStorage
      localStorage.setItem("organizerId", organizerId);
      toast.success('Registration successful. Organizer ID sent via email.');
      reset();
      setTimeout(() => navigate('/organizer-dashboard'), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <>
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Organizer Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              {...register('name')}
              placeholder="Enter Full Name"
              className="input w-full"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div>
            <label className="block font-medium mb-1">Age</label>
            <input
              {...register('age')}
              placeholder="Enter Age"
              className="input w-full"
            />
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
            <input
              {...register('phone')}
              placeholder="Enter Phone Number"
              className="input w-full"
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>

          <div>
            <label className="block font-medium mb-1">Organization Type</label>
            <select {...register('organizationType')} className="input w-full">
              <option value="">Select Organization Type</option>
              <option value="individual">Individual</option>
              <option value="company">Company</option>
              <option value="college">College</option>
              <option value="ngo">NGO</option>
              <option value="others">Others</option>
            </select>
            <p className="text-red-500 text-sm">
              {errors.organizationType?.message}
            </p>
          </div>

          {['company', 'college', 'ngo'].includes(orgType) && (
            <div>
              <label className="block font-medium mb-1">Organization Name</label>
              <input
                {...register('organizationName')}
                placeholder="Enter Organization Name"
                className="input w-full"
              />
              <p className="text-red-500 text-sm">
                {errors.organizationName?.message}
              </p>
            </div>
          )}

          {['individual', 'company', 'college', 'ngo'].includes(orgType) && (
            <div>
              <label className="block font-medium mb-1">Profession</label>
              <input
                {...register('profession')}
                placeholder="Enter Your Profession"
                className="input w-full"
              />
              <p className="text-red-500 text-sm">
                {errors.profession?.message}
              </p>
            </div>
          )}

          {orgType === 'others' && (
            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="input w-full"
                placeholder="Describe your organization"
              ></textarea>
              <p className="text-red-500 text-sm">
                {errors.description?.message}
              </p>
            </div>
          )}

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

export default OrganizerForm;
