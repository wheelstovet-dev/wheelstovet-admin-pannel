'use client';
import React from 'react';

const ViewUser = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="bg-white border p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-1">User Detail</h2>
        <p className="text-gray-600 mb-6">For business, band or celebrity.</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">First Name</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block mb-2">Last Name</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block mb-2">Email ID</label>
            <input type="email" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block mb-2">Phone Number</label>
            <input type="tel" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="col-span-1">
            <label className="block mb-2">Location</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
        </div>
        {/* <div className="flex justify-end space-x-4 mt-6">
          <button className="px-4 py-2 bg-gray-300 text-black rounded">Cancel</button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded">Save Changes</button>
        </div> */}
      </div>

      <div className="bg-white border p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-1">Pet Detail</h2>
        <p className="text-gray-600 mb-6">For business, band or celebrity.</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Name</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block mb-2">Species</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block mb-2">Age</label>
            <input type="number" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block mb-2">Breed</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block mb-2">Temperament</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div>
            <label className="block mb-2">Behaviour</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="col-span-1">
            <label className="block mb-2">Health issue</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
        </div>
        {/* <div className="flex justify-end space-x-4 mt-6">
          <button className="px-4 py-2 bg-gray-300 text-black rounded">Cancel</button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded">Save Changes</button>
        </div> */}
      </div>
    </div>
  );
};

export default ViewUser;
