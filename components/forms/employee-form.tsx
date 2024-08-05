'use client';
import { useState, ChangeEvent, FormEvent } from 'react';


export default function EmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    adharNo: '',
    totalExperience: '',
    phoneNumber: '',
    emailId: '',
    role: '',
    dateOfBirth: '',
    gender: '',
    streetAddress: '',
    city: '',
    state: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
              placeholder="Enter First Name"
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
              placeholder="Enter Last Name"
              value={formData.lastName}
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
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="emailId" className="font-medium">Email</label>
            <input
              type="email"
              name="emailId"
              id="emailId"
              placeholder="Enter Email"
              value={formData.emailId}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="dateOfBirth" className="font-medium">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="gender" className="font-medium">Gender</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="streetAddress" className="font-medium">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              id="streetAddress"
              placeholder="Enter Street Address"
              value={formData.streetAddress}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="city" className="font-medium">City</label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="state" className="font-medium">State</label>
            <input
              type="text"
              name="state"
              id="state"
              placeholder="Enter State"
              value={formData.state}
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
              placeholder="Enter Role"
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
