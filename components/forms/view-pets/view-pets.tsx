'use client'; // Only for Next.js 13+ App Router if you need client-side functionality

import { useSearchParams } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';
import React from 'react';


export const ViewPets: React.FC<any> = () => {
//   const { userId } = useSearchParams(); // Access userId from URL
// const userId:any = window.location.href.split('/').filter(Boolean).pop();
const searchParams = useSearchParams();
    const userId: any = searchParams.get('id'); // Get the admin ID from URL
    // console.log(userId);


  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-1">Pet Detail for User {userId}</h2>
        <p className="text-gray-600 mb-6">For business, band, or celebrity.</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Name</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" readOnly />
          </div>
          <div>
            <label className="block mb-2">Species</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" readOnly />
          </div>
          <div>
            <label className="block mb-2">Age</label>
            <input type="number" className="w-full border border-gray-300 p-2 rounded" readOnly />
          </div>
          <div>
            <label className="block mb-2">Breed</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" readOnly />
          </div>
          <div>
            <label className="block mb-2">Temperament</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" readOnly />
          </div>
          <div>
            <label className="block mb-2">Behaviour</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" readOnly />
          </div>
          <div className="col-span-1">
            <label className="block mb-2">Health issue</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

