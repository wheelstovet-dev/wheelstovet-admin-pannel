'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './cloumns';



interface PendingSubscriptionClientProps {
  initialData: any[];
  loading:boolean;
}

export const PendingSubscriptionClient: React.FC<PendingSubscriptionClientProps> = ({initialData,loading}) => {
  const router = useRouter();
  // const initialData: Enquiry[] = EnquiryData;
  const [data, setData] = useState<any[]>(initialData || []);

  useEffect(() => {
    setData(initialData || []);
  }, [initialData]);


  const handleRowClick = (rowData: any) => {
    router.push(`/subscription-management`);
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title="Pending Subscription" description="" />
      </div>
      <Separator />
      {loading ? (
        'Loading...'
      ) : (
        <div>
          {/* Wrap DataTable in a div to capture clicks */}
          {data.map((row, index) => (
            <div
              key={index}
              onClick={() => handleRowClick(row)} // Handle row click
              className="cursor-pointer hover:bg-gray-100"
            >
              <DataTable columns={columns} data={[row]} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};