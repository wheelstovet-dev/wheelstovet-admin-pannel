'use client';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

const services = [
  { name: 'DOG WALKING',folderRoute:"dogwalking", icon: '/images/Frame (2).png' },
  { name: 'SALON VISIT',folderRoute:"salonvisit", icon: '/images/salon.png' },
  { name: 'VETERINARY VISIT',folderRoute:"veterinary", icon: '/images/vietnary.png' },
  { name: 'PET TAXI',folderRoute:"pettaxi", icon: '/images/taxi.png' },
  { name: 'PET HANDLING',folderRoute:"pethandling", icon: '/images/handle.png' },
  { name: 'PET RESCUE',folderRoute:"petrescue", icon: '/images/rescue.png' }
];


export default function ServiceManagementPage() {
  const router = useRouter();
  const handleClick = (folderRoute: string) => {
    router.push(folderRoute);
    // Handle the page navigation here
  };
  
  return (
    <MainLayout meta={{ title: 'Service Management' }}>
      <ScrollArea className="h-full">
        <div className="space-y-8 p-8">
          <h1 className="text-3xl font-bold">Service Management</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {services.map(service => (
              <div
                key={service.name}
                className="bg-white p-8 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleClick(service.folderRoute)}
              >
                <h2 className="text-sm font-semibold">SERVICE</h2>
                <h2 className="text-xl font-bold mb-4">{service.name}</h2>
                <img src={service.icon} alt={service.name} className="w-24 h-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
