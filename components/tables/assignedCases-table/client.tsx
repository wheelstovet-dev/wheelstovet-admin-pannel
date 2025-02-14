'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAssignedCasesById } from '@/app/redux/actions/employeeAction';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export const AssignedClient: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const dispatch = useDispatch<AppDispatch>();
  const { assignedCases, loading } = useSelector((state: RootState) => state.employee);

  const [filterType, setFilterType] = useState('By Service');
  const [filteredCases, setFilteredCases] = useState(assignedCases);

  useEffect(() => {
    if (id) {
      dispatch(getAssignedCasesById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setFilteredCases(assignedCases);
  }, [assignedCases]);

  const handleFilterChange = (serviceName: string | null) => {
    setFilterType(serviceName || 'By Service');
    if (serviceName) {
      setFilteredCases(assignedCases.filter((caseItem: any) => caseItem.ServiceId?.serviceName === serviceName));
    } else {
      setFilteredCases(assignedCases);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Assigned Cases (${filteredCases?.length})`} description="" />

        {/* Service Name Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
            {filterType} <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center text-gray-600 px-4 py-2">
                Filter by Service
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {['Salon Visit', 'Vet Visit', 'To Hostel', 'Pet Taxi'].map((service) => (
                  <DropdownMenuItem key={service} onClick={() => handleFilterChange(service)}>
                    {service}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => handleFilterChange(null)}>Reset</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator />

      {loading ? 'Loading...' : <DataTable columns={columns} data={filteredCases} />}
    </>
  );
};
