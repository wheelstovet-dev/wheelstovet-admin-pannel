'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getDogWalkPlans } from '@/app/redux/actions/servicesAction';

export default function DogWalkingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { dogPlans, loading, error } = useSelector((state: RootState) => state.service);

  useEffect(() => {
    // Dispatch the action to fetch dog walk plans when the component mounts
    const fetchDogWalkPlans = async () => {
      await dispatch(getDogWalkPlans());
    };

    fetchDogWalkPlans();
  }, [dispatch]);

   // Group plans by type (Daily, Weekly, Monthly)
   const groupedPlans:any = {
    Daily: dogPlans.filter(plan => plan.Name === 'Daily'),
    Weekly: dogPlans.filter(plan => plan.Name === 'Weekly'),
    Monthly: dogPlans.filter(plan => plan.Name === 'Monthly'),
  };

  return (
    // <MainLayout meta={{ title: 'Service Management' }}>
    //   <ScrollArea className="h-full">
    //     <div className="container mx-auto p-8">
    //       <h1 className="text-3xl font-bold mb-8">Service Management</h1>
    //       <div className="bg-white p-8 rounded-lg shadow-md">
    //         <h2 className="text-3xl font-bold mb-8">Dog Walking</h2>
    //         <div className="space-y-8">
    //           {loading && <p>Loading plans...</p>}
    //           {error && <p>Error: {error}</p>}
    //           {dogPlans.map(plan => (
    //             <div key={plan._id}>
    //               <h3 className="text-2xl font-semibold">{plan.Name}</h3>
    //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    //                 <div className="flex items-center">
    //                   <label className="block font-bold text-gray-700 w-full">
    //                     {plan.Frequency} time dog walking per day
    //                   </label>
    //                   <input
    //                     type="number"
    //                     value={plan.BasePrice}
    //                     className="mt-1 block w-20 border rounded p-2"
    //                     disabled
    //                   />
    //                   <span className="ml-2 font-bold">INR</span>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </ScrollArea>
    // </MainLayout>

    // <MainLayout meta={{ title: 'Service Management' }}>
    //   <ScrollArea className="h-full">
    //     <div className="container mx-auto p-8">
    //       <h1 className="text-3xl font-bold mb-8">Service Management</h1>
    //       <div className="bg-white p-8 rounded-lg shadow-md">
    //         <h2 className="text-3xl font-bold mb-8">Dog Walking</h2>
    //         <div className="space-y-8">
    //           <div>
    //           <h3 className="text-2xl font-semibold">Daily</h3>
                
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    //               <div className="flex items-center">
    //                 <label className="block font-bold text-gray-700 w-full">1 time dog walking per day</label>
    //                 <input
    //                   type="number"
    //                   value={charges.dailyPlan1}
    //                   onChange={(e) => handleInputChange(e, 'dailyPlan1')}
    //                   className="mt-1 block w-20 border rounded p-2"
    //                 />
    //                 <span className="ml-2 font-bold">INR</span>
    //               </div>
    //               <div className="flex items-center">
    //                 <label className="block font-bold text-gray-700 w-full">2 times dog walking per day</label>
    //                 <input
    //                   type="number"
    //                   value={charges.weeklyPlan1}
    //                   onChange={(e) => handleInputChange(e, 'weeklyPlan1')}
    //                   className="mt-1 block w-20 border rounded p-2"
    //                 />
    //                 <span className="ml-2 font-bold">INR</span>
    //               </div>
                 
    //             </div>
    //           </div>
    //           <div>
    //             <h3 className="text-2xl font-semibold">Weekly</h3>
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    //               <div className="flex items-center">
    //                 <label className="block font-bold text-gray-700 w-full">1 time dog walking per day</label>
    //                 <input
    //                   type="number"
    //                   value={charges.dailyPlan2}
    //                   onChange={(e) => handleInputChange(e, 'dailyPlan2')}
    //                   className="mt-1 block w-20 border rounded p-2"
    //                 />
    //                 <span className="ml-2 font-bold">INR</span>
    //               </div>
    //               <div className="flex items-center">
    //                 <label className="block font-bold text-gray-700 w-full">2 times dog walking per day</label>
    //                 <input
    //                   type="number"
    //                   value={charges.weeklyPlan2}
    //                   onChange={(e) => handleInputChange(e, 'weeklyPlan2')}
    //                   className="mt-1 block w-20 border rounded p-2"
    //                 />
    //                 <span className="ml-2 font-bold">INR</span>
    //               </div>
    //               {/* <div className="flex items-center">
    //                 <label className="block font-bold text-gray-700 w-full">Monthly plan charges</label>
    //                 <input
    //                   type="number"
    //                   value={charges.monthlyPlan2}
    //                   onChange={(e) => handleInputChange(e, 'monthlyPlan2')}
    //                   className="mt-1 block w-20 border rounded p-2"
    //                 />
    //                 <span className="ml-2 font-bold">INR</span>
    //               </div> */}
    //             </div>
    //           </div>

    //           <div>
    //             <h3 className="text-2xl font-semibold">Monthly</h3>
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    //               <div className="flex items-center">
    //                 <label className="block font-bold text-gray-700 w-full">1 time dog walking per day</label>
    //                 <input
    //                   type="number"
    //                   value={charges.dailyPlan2}
    //                   onChange={(e) => handleInputChange(e, 'dailyPlan2')}
    //                   className="mt-1 block w-20 border rounded p-2"
    //                 />
    //                 <span className="ml-2 font-bold">INR</span>
    //               </div>
    //               <div className="flex items-center">
    //                 <label className="block font-bold text-gray-700 w-full">2 times dog walking per day</label>
    //                 <input
    //                   type="number"
    //                   value={charges.weeklyPlan2}
    //                   onChange={(e) => handleInputChange(e, 'weeklyPlan2')}
    //                   className="mt-1 block w-20 border rounded p-2"
    //                 />
    //                 <span className="ml-2 font-bold">INR</span>
    //               </div>
                 
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex justify-start mt-8">
    //           <button
    //             className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4"
    //             onClick={handleCancel}
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             className="bg-yellow-500 text-white py-2 px-4 rounded"
    //             onClick={handleSubmit}
    //           >
    //             Save Changes
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </ScrollArea>
    // </MainLayout>

    // <MainLayout meta={{ title: 'Service Management' }}>
    //   <ScrollArea className="h-full">
    //     <div className="container mx-auto p-8">
    //       <h1 className="text-3xl font-bold mb-8">Service Management</h1>
    //       <div className="bg-white p-8 rounded-lg shadow-md">
    //         <h2 className="text-3xl font-bold mb-8">Dog Walking</h2>
    //         <div className="space-y-8">
    //           {loading && <p>Loading plans...</p>}
    //           {error && <p>Error: {error}</p>}
    //           {dogPlans.map(plan => (
    //             <div key={plan._id} className="space-y-4">
    //               <h3 className="text-2xl font-semibold">{plan.Name}</h3>
    //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    //                 <div className="flex items-center">
    //                   <label className="block font-bold text-gray-700 w-full">
    //                     {plan.Frequency} time dog walking per day
    //                   </label>
    //                   <input
    //                     type="number"
    //                     value={plan.BasePrice}
    //                     className="mt-1 block w-20 border rounded p-2"
    //                     disabled
    //                   />
    //                   <span className="ml-2 font-bold">INR</span>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </ScrollArea>
    // </MainLayout>
    <MainLayout meta={{ title: 'Service Management' }}>
    <ScrollArea className="h-full">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Service Management</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-8">Dog Walking</h2>
          <div className="space-y-8">
            {loading && <p>Loading plans...</p>}
            {error && <p>Error: {error}</p>}

            {/* Render each type section (Daily, Weekly, Monthly) */}
            {['Daily', 'Weekly', 'Monthly'].map(type => (
              <div key={type}>
                <h3 className="text-2xl font-semibold mb-4">{type}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedPlans[type].map((plan:any) => (
                    <div key={plan._id} className="flex items-center border p-4 rounded-lg">
                      <label className="block font-bold text-gray-700 w-full">
                        {plan.Frequency} time dog walking per day
                      </label>
                      <input
                        type="number"
                        value={plan.BasePrice}
                        className="mt-1 block w-20 border rounded p-2"
                        disabled
                      />
                      <span className="ml-2 font-bold">INR</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  </MainLayout>
  );
}
