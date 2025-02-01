import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getTodaysCases } from '@/app/redux/actions/dashboardAction';

// Static imports for different avatars based on service type
import dog from '@/public/images/Frame (2).png'; // Example static import, replace with actual paths
import petTaxi from '@/public/images/taxi.png'; // Example static import, replace with actual paths
import salonVisit from '@/public/images/salon.png'; // Example static import, replace with actual paths
import outingWithPet from '@/public/images/handle.png'; // Example static import, replace with actual paths
import rescue from '@/public/images/rescue.png'; // Example static import, replace with actual paths

import { CardDescription, CardHeader, CardTitle } from './ui/card';

interface Case {
  avatar?: StaticImageData;
  name?: string;
  paymentStatus?: string;
  time?: string;
  currentStatus?: string;
  serviceType?: string; // New field for service type
}

export function RecentCases() {
  const dispatch = useDispatch<AppDispatch>();
  const { todaysCases, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  // Fetch today's cases when the component mounts
  useEffect(() => {
    dispatch(getTodaysCases())
      .unwrap()
      .catch((err: any) => {
        const errorMessage = err.message || 'Failed to fetch today\'s cases';
        alert(errorMessage);
      });
  }, [dispatch]);

  // Mapping the API data into the format required for the RecentCases component
  const formattedCases = todaysCases.map((caseItem: any) => ({
    name: caseItem.ServiceId?.serviceName || 'Unknown Service',
    paymentStatus: caseItem.TransactionStatus || 'Pending',
    time: caseItem.TimeSlot,
    currentStatus: caseItem.CurrentStatus || 'Not Available',
    serviceType: caseItem.ServiceId?.serviceType || 'default', // Add serviceType field
  }));

  // Function to return the avatar image based on serviceType
  const getAvatar = (serviceType: string): StaticImageData => {
    if (serviceType === 'Pet Taxi') {
      return petTaxi; // Return appropriate static image for service1
    }
    if (serviceType === 'Outing with pets') {
      return outingWithPet; // Return appropriate static image for service2
    }
    if (serviceType === 'Salon Visit') {
      return salonVisit; // Return appropriate static image for service2
    }
    if (serviceType === 'Vetinary Visit') {
      return rescue; // Return appropriate static image for service2
    }
    return dog; // Default avatar if service type doesn't match
  };

  return (
    <div>
      {/* Loading and Error Handling */}
      {loading && <div>Loading...</div>}
      {/* {error && <div>{error}</div>} */}

      <CardHeader>
        <CardTitle className="text-2xl">Cases for Today</CardTitle> {/* Large Title */}
        <CardDescription className="text-l text-gray-500">
          You have {formattedCases.length} Cases for today.
        </CardDescription>
      </CardHeader>

      {/* Check if there are no cases */}
      {formattedCases.length === 0 ? (
        <div className="flex justify-center items-center bg-white p-4 rounded-lg">
          <p className="text-xl text-gray-500">No Cases for Today</p>
        </div>
      ) : (
        <div className="space-y-3">
          {formattedCases.map((caseData, index) => (
            <div
              className="flex items-center p-3 transition-all duration-200 transform hover:scale-105 hover:bg-yellow-500"
              key={index}
            >
              {/* Avatar */}
              <Avatar className="h-9 w-9">
                <Image
                  src={getAvatar(caseData.serviceType)}  // Get avatar based on serviceType
                  alt="Avatar"
                  layout="intrinsic"  // Ensures the image doesn't stretch
                  width={36}           // Set width and height as per your design
                  height={36}
                />
              </Avatar>

              {/* Name and Payment Status */}
              <div className="ml-4 space-y-1">
                <p className="text-sm font-small leading-none">{caseData.name || 'Unnamed'}</p>
                {caseData.paymentStatus && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold">Payment Status:</span> {caseData.paymentStatus}
                  </p>
                )}
              </div>

              {/* Time and Current Status */}
              <div className="ml-auto text-xs font-small">
                {caseData.time && <p>{caseData.time}</p>}
                {caseData.currentStatus && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold">Current Status:</span> {caseData.currentStatus}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
