'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import MainLayout from '@/components/layout/main-layout';

export default function EmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    adharNo: '',
    totalExperience: '',
    phoneNumber: '',
    emailId: '',
    role: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Employee Profile</h2>
      <p className="text-gray-500 mb-6">For business, band or celebrity.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="firstName" className="font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="xyz"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="lastName" className="font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="abc"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="adharNo" className="font-medium">Adhar No</label>
            <input
              type="text"
              name="adharNo"
              id="adharNo"
              placeholder="01234567893"
              value={formData.adharNo}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="totalExperience" className="font-medium">Total Experience</label>
            <input
              type="text"
              name="totalExperience"
              id="totalExperience"
              placeholder="10"
              value={formData.totalExperience}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="phoneNumber" className="font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="+91 9888098980"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="emailId" className="font-medium">Email ID</label>
            <input
              type="email"
              name="emailId"
              id="emailId"
              placeholder="abc@gmail.com"
              value={formData.emailId}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="role" className="font-medium">Role</label>
            <input
              type="text"
              name="role"
              id="role"
              placeholder="Dog Walking"
              value={formData.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
