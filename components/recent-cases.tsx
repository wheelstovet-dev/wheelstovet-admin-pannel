import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getTodaysCases } from '@/app/redux/actions/dashboardAction';

// Static imports for different avatars based on service name
import salonVisit from '@/public/images/salon.png';
import hostel from '@/public/images/vietnary.png';
import outingWithPet from '@/public/images/handle.png';
import rescue from '@/public/images/rescue.png';
import petTaxi from '@/public/images/taxi.png';
import dog from '@/public/images/Frame (2).png'; 

import { CardDescription, CardHeader, CardTitle } from './ui/card';

interface Case {
  avatar?: StaticImageData;
  name?: string;
  paymentStatus?: string;
  time?: string;
  currentStatus?: string;
  serviceName?: string;
}

export function RecentCases() {
  const dispatch = useDispatch<AppDispatch>();
  const { todaysCases, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(getTodaysCases()).unwrap().catch(() => {});
  }, [dispatch]);

  const formattedCases = todaysCases.map((caseItem: any) => ({
    name: caseItem.ServiceId?.serviceName || 'Unknown Service',
    paymentStatus: caseItem.TransactionStatus || 'Pending',
    time: caseItem.TimeSlot,
    currentStatus: caseItem.CurrentStatus || 'Not Available',
    serviceName: caseItem.ServiceId?.serviceName || 'default',
  }));

  // Mapping of service names to images
  const serviceImages: { [key: string]: StaticImageData } = {
    'To Hostel': hostel,
    'Vet Visit': petTaxi,
    'Salon Visit': salonVisit,
    'Outing with pets': outingWithPet,
    'Rescue': rescue,
    'Pet Taxi': petTaxi,
  };

  // Function to get avatar based on service name
  const getAvatar = (serviceName: string): StaticImageData => {
    return serviceImages[serviceName] || dog;
  };

  return (
    <div>
      {loading && <div>Loading...</div>}

      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black">
          Cases for Today
        </CardTitle>
        <CardDescription className="text-l text-gray-500">
          You have {formattedCases.length} Cases for today.
        </CardDescription>
      </CardHeader>

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
              <Avatar className="h-9 w-9">
                <Image
                  src={getAvatar(caseData.serviceName)}
                  alt="Avatar"
                  layout="intrinsic"
                  width={36}
                  height={36}
                />
              </Avatar>

              <div className="ml-4 space-y-1">
                <p className="text-sm font-small leading-none">
                  {caseData.name || 'Unnamed'}
                </p>
                {caseData.paymentStatus && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold">Payment Status:</span>{' '}
                    {caseData.paymentStatus}
                  </p>
                )}
              </div>

              <div className="ml-auto text-xs font-small">
                {caseData.time && <p>{caseData.time}</p>}
                {caseData.currentStatus && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold">Current Status:</span>{' '}
                    {caseData.currentStatus}
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
