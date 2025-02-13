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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { CalendarDateRangePicker } from '@/components/date-range-picker';

export const AssignedClient: React.FC = () => {
  // const router = useRouter();
  // Parse the URL to get the 'id' parameter
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const dispatch = useDispatch<AppDispatch>();
  const { assignedCases, loading } = useSelector((state: RootState) => state.employee);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(assignedCases);
  const [filteredCases, setFilteredCases] = useState(assignedCases || []); // State for filtered users

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

useEffect(() => {
  let filtered = assignedCases;

  // Apply search filter
  if (assignedCases) {
    const lowerCasedSearchValue = searchTerm.toLowerCase();
    const newFilteredCases =
      searchTerm.trim() === ""
        ? assignedCases // Show all users if no search value
        : assignedCases.filter((cases: any) =>
            cases?.CurrentStatus?.toLowerCase().includes(lowerCasedSearchValue)
          );
        console.log(newFilteredCases);
    setFilteredCases(newFilteredCases);
  }
  // if (searchTerm) {
  //   console.log("SearchTerm",searchTerm)
  //   console.log("Filtered",filtered)
  //   filtered = filtered.filter((item: any) =>
  //     ['serviceName', 'assignedEmployee'].some((key) =>
  //       item[key]?.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );
  //   console.log(filtered)
  // }

  // Apply status filter
  if (statusFilter) {
    filtered = filtered.filter((item: any) => item.CurrentStatus === statusFilter);
  }

  setFilteredData(filtered);
}, [assignedCases, searchTerm, statusFilter]);

const handleSearch = (value: string) => setSearchTerm(value);

const handleStatusFilterChange = (serviceName: string) => {
  setFilterType(serviceName || 'By type');
  setStatusFilter(serviceName || null);
};
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Assigned Cases (${filteredData?.length})`}
          description=""
        />
        
      </div>
      <Separator />
      {loading ? 'Loading...' :
      
      
      <DataTable
        //searchKeys={['serviceName', 'assignedEmployee']}
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
      />
}
    </>
  );
};
