'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Pencil, Trash, Plus } from 'lucide-react';

const initialRoles = [
  'Dog Walking',
  'Salon Visit',
  'Veterinary Visit',
  'Pet Taxi',
  'Pet Handling',
  'Pet Rescue',
];

export default function EmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    aadharNo: '',
    totalExperience: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    emailId: '',
    role: '',
    dateOfBirth: '',
    gender: '',
    streetAddress: '',
    city: '',
    state: '',
  });

  const [roles, setRoles] = useState(initialRoles);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newRole, setNewRole] = useState('');

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

  const handleAddRole = () => {
    if (newRole && !roles.includes(newRole)) {
      setRoles((prevRoles) => [...prevRoles, newRole]);
      setNewRole('');
    }
  };

  const handleEditRole = (index: number) => {
    const editedRole = prompt('Edit role:', roles[index]);
    if (editedRole) {
      const updatedRoles = [...roles];
      updatedRoles[index] = editedRole;
      setRoles(updatedRoles);
    }
  };

  const handleDeleteRole = (index: number) => {
    const updatedRoles = roles.filter((_, i) => i !== index);
    setRoles(updatedRoles);
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
              required
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
              required
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
              required
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="alternatePhoneNumber" className="font-medium">Alternate Mobile No</label>
            <input
              type="text"
              name="alternatePhoneNumber"
              id="alternatePhoneNumber"
              placeholder="Enter Alternate Mobile No"
              value={formData.alternatePhoneNumber}
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
              required
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="aadharNo" className="font-medium">Aadhar Card No</label>
            <input
              type="text"
              name="aadharNo"
              id="aadharNo"
              placeholder="Enter Aadhar Card No"
              value={formData.aadharNo}
              onChange={handleChange}
              required
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
              required
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
              required
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
              required
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
              required
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="role" className="font-medium flex items-center">
                Role
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="ml-2 p-1 bg-transparent border-none cursor-pointer"
                >
                  <Pencil className="w-4 h-4 text-red-500" />
                </button>
              </label>
            </div>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            >
              <option value="">Select Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Roles</h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-500 mb-4">Add or remove roles.</p>
            <div className="flex mb-4">
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="New Role"
                className="border border-gray-300 rounded-l-lg px-4 py-2 flex-grow"
              />
              <button
                type="button"
                onClick={handleAddRole}
                className="bg-green-500 text-white px-4 py-2 rounded-r-lg"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2">
              {roles.map((role, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{role}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteRole(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
