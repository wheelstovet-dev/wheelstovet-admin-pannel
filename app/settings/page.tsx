'use client';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';

export default function SettingsPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Email, setEmail] = useState('');

  useEffect(() => {
    // Assume a function fetchEmail() that fetches the user's email
    const fetchEmail = async () => {
      // Replace with actual fetch logic
      const userEmail = 'user@example.com';
      setEmail(userEmail);
    };
    fetchEmail();
  }, []);

  return (
    <MainLayout meta={{ title: 'Settings' }}>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <h2 className="text-2xl font-bold">Change Password</h2>
        <div className="bg-white p-9 rounded-xl shadow-md">
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 text-gray-700">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
         
          <div className="flex mt-4 space-x-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Cancel</button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Save Changes</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
