'use client';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useEffect } from 'react';
import { getAllServices } from '../redux/actions/servicesAction';
import ProtectedRoute from '@/components/protectedRoute';

const servicesData = [
  { name: 'DOG WALKING', folderRoute: "dogwalking", icon: '/images/Frame (2).png' },
  { name: 'SALON VISIT', folderRoute: "salonvisit", icon: '/images/salon.png' },
  { name: 'VET VISIT', folderRoute: "veterinary", icon: '/images/vietnary.png' },
  { name: 'PET TAXI', folderRoute: "pettaxi", icon: '/images/taxi.png' },
  { name: 'PET HANDLING', folderRoute: "pethandling", icon: '/images/handle.png' },
  { name: 'PET RESCUE', folderRoute: "petrescue", icon: '/images/rescue.png' },
  { name: 'TO HOSTEL', folderRoute: "hostels", icon: '/images/rescue.png' },
  { name: 'OUTING WITH PET', folderRoute: "outingWithPet", icon: '/images/Frame (2).png' },
  { name: 'PET RELOCATION', folderRoute: "petRelocation", icon: '/images/taxi.png' },
];

export default function ServiceManagementPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector((state: RootState) => state.service);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const router = useRouter();

  // Merge servicesData with the API response data
  const mergedServices = services.map(service => {
    const staticService = servicesData.find(item => item.name.toUpperCase() === service.serviceName.toUpperCase());
    return {
      ...service,
      folderRoute: staticService?.folderRoute || '',
      icon: staticService?.icon || '/images/default.png'
    };
  });

  const handleClick = (folderRoute: string, id?: string) => {
    if (folderRoute) {
      const path = id ? `/service-management/${folderRoute}/?id=${id}` : `/service-management/${folderRoute}`;
      router.push(path);
    }
  };
  

  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Service Management' }}>
      <ScrollArea className="h-full">
        <div className="space-y-8 p-8">
          <h1 className="text-3xl font-bold">Service Management</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {loading ? (
                  <div className="flex justify-center py-8">
                    <span className="text-gray-500">Loading ...</span>
                  </div>
                ) : (
                  <>
          <div className="bg-white p-8 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleClick(servicesData[0].folderRoute, )}
              >
                <h2 className="text-sm font-semibold">SERVICE</h2>
                <h2 className="text-xl font-bold mb-4">Dog Walking</h2>
                <img src={servicesData[0].icon} alt={servicesData[0].name} className="w-24 h-24 mx-auto" />
              </div>
            {mergedServices.map(service => (
              <div
                key={service._id}
                className="bg-white p-8 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleClick(service.folderRoute, service._id)}
              >
                <h2 className="text-sm font-semibold">SERVICE</h2>
                <h2 className="text-xl font-bold mb-4">{service.serviceName}</h2>
                <img src={service.icon} alt={service.serviceName} className="w-24 h-24 mx-auto" />
              </div>
            ))}
            </>
          )}
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}
