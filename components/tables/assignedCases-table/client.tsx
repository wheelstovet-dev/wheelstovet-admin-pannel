'use client';

import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
// import {AssignedCase, AssignedCaseData} from '@/constants/assigned-case-data' ;
// import { Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAssignedCasesById } from '@/app/redux/actions/employeeAction';

export const AssignedClient: React.FC = () => {
  // const router = useRouter();
  // Parse the URL to get the 'id' parameter
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const dispatch = useDispatch<AppDispatch>();
  const { assignedCases, loading } = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    if (id) {
      dispatch(getAssignedCasesById(id));
    }
  }, [dispatch, id]);

  // console.log(assignedCases);

  // const [initialCharges, setInitialCharges] = useState<RescueChargesFormValues>({} as RescueChargesFormValues);
  // const [data, setData] = useState<InitialFormValues>({} as InitialFormValues);

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
          title={`Assigned Cases (${assignedCases.length})`}
          description="Manage case."
        />
      
      </div>
      <Separator />
      {loading ? 'Loading...' :
      
      <DataTable
        // searchKey="type"
        columns={columns}
        data={assignedCases}
        // onSearch={handleSearch}
        // filters={filters}
        // rowNo={0}
        // onSort={handleSort}
      />
}
    </>
  );
};
