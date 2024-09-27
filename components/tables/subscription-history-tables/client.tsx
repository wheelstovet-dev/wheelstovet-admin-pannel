'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
// import { UserManagement, userManagementData } from '@/constants/user-management-data';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { SubscriptionHistory, SubscriptionHistoryData } from '@/constants/subscriptionHistory';

export const  SubscriptionHistoryClient: React.FC = () => {
  const router = useRouter();
  const initialData: SubscriptionHistory[] = SubscriptionHistoryData;
  const [data, setData] = useState<SubscriptionHistory[]>(initialData);

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.date.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    // Example: Sorting by first name
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.date.localeCompare(b.date);
      } else {
        return b.date.localeCompare(a.date);
      }
    });
    setData(sortedData);
  };

  const filters = [
    {
      label: 'Subscription Status',
      subOptions: ['Active', 'In Active', 'All Subscription'],
    },
    {
      label: 'Subscription Plan',
      subOptions: ['Daily', 'Weekly', 'Monthly'],
    },
  ];
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Manage Subscription (${data.length})`}
          description="Manage Subscription (Client side table functionalities.)"
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/subscription`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable
        searchKeys={["subscriptionPlan"]}
        columns={columns}
        data={data}
        onSearch={handleSearch} 
        filters={filters}
      />
    </>
  );
};