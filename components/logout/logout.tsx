'use client';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Clear session storage (or local storage) to remove user data
    sessionStorage.removeItem('token'); // Adjust if you're using a different key for the session

    // Optional: If you have an API endpoint to invalidate the session, you can call it here
    // fetch('/api/logout', { method: 'POST' })
    //   .then(() => {
    //     console.log('User logged out');
    //   })
    //   .catch((error) => console.error('Logout failed', error));

    // 2. Redirect to the login page after logout
    router.push('/login');
  };

  return (
    <MainLayout meta={{ title: 'Logout' }}>
      <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Logout</h2>
          <p className="text-gray-500 mb-6 text-center">Are you sure you want to logout?</p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-lg"
              onClick={() => router.back()} // Go back to the previous page
            >
              Cancel
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
