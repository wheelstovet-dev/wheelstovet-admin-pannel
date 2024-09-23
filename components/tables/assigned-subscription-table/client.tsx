'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { AssignedSubscription, AssignedSubscriptionData } from '@/constants/assigned-subscription-data';

export const  AssignedSubscriptionClient: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<AssignedSubscription[]>(AssignedSubscriptionData); 

//   const handleSearch = (searchValue: string) => {
//     const filteredData = TaskHistoryData.filter(item =>
//       item.taskType.toLowerCase().includes(searchValue.toLowerCase()) || 
//       item.taskType.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     setData(filteredData);
//   };

 
//   const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
//     const sortedData = [...data].sort((a, b) => {
//       if (sortOrder === 'asc') {
//         return a[sortBy].localeCompare(b[sortBy]);
//       } else {
//         return b[sortBy].localeCompare(a[sortBy]);
//       }
//     });
//     setData(sortedData);
//   };

//   const filters = [
//     {
//       label: 'Task Type',
//       subOptions: ['Survey Completion', 'Quality Inspection', 'Training Completion', 'Review Completion', 'Research Analysis'],
//     },
   
//   ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Assigned Subscription (${data.length})`}
          description="View assigned employee subscription"
        />
      
      </div>
      <Separator />
      <DataTable
        // searchKey="type"
        columns={columns}
        data={data}
        // onSearch={handleSearch}
        // filters={filters}
        // rowNo={0}
        // onSort={handleSort}
      />
    </>
  );
};
