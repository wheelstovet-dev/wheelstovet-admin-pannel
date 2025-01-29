'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

interface PendingSubscriptionClientProps {
  initialData: any[];
  loading: boolean;
}

export const PendingSubscriptionClient: React.FC<PendingSubscriptionClientProps> = ({
  initialData,
  loading,
}) => {
  const router = useRouter();
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
        <div className="text-center mt-4">Loading...</div>
      ) : data.length === 0 ? ( // Check if data is empty
        <div className="mt-4 mb-6 bg-white text-center py-4 rounded shadow">
        No pending subscriptions found.
      </div>
      ) : (
        <DataTable columns={columns} data={data}/>
      )}
    </>
  );
};
