'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Heading } from '@/components/ui/heading';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { getAllCases } from '@/app/redux/actions/casesAction';
import { Button } from '@/components/ui/button';
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

const statusFlow = [
  'Pending',
  'Assigned',
  'Pickup scheduled',
  "Pet's pickup done",
  'Reached clinic',
  'Health checkup in Progress',
  'Checkup completed prescription uploaded',
  'Left for dropping pet back',
  'Completed',
];

const serviceTypes = ['Salon Visit', 'Vet Visit', 'To Hostel', 'Pet Taxi'];

const CaseManagementClient: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { cases, loading, error } = useSelector((state: RootState) => state.caseManagement);

  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [casesData, setCasesData] = useState(cases || []);
  const [filteredCases, setFilteredCases] = useState(cases || []);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [serviceFilter, setServiceFilter] = useState<string | null>(null);

  const getAllCasesData = async () => {
    dispatch(setLoading(true));

    try {
      const resultAction: any = await dispatch(getAllCases({ page: pageNumber, limit: limit }));

      if (resultAction.type === 'cases/getAll/fulfilled') {
        setCasesData(resultAction?.payload?.data);
        setFilteredCases(resultAction?.payload?.data);
        setTotalRecords(resultAction?.payload?.pagination?.total);
      } else {
        throw new Error(resultAction.payload?.message || 'Failed to fetch cases');
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'Failed to fetch cases',
      });
    }
  };

  useEffect(() => {
    getAllCasesData();
  }, [pageNumber, limit]);

  useEffect(() => {
    let filteredData = casesData;

    if (statusFilter) {
      filteredData = filteredData.filter((caseItem: any) => caseItem.CurrentStatus === statusFilter);
    }

    if (serviceFilter) {
      filteredData = filteredData.filter((caseItem: any) => caseItem.ServiceId?.serviceName === serviceFilter);
    }

    setFilteredCases(filteredData);
  }, [statusFilter, serviceFilter, casesData]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNumber(newPage);
    }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`All Cases (${filteredCases.length})`} description="" />

        {/* Unified Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
            Filters <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* Service Filter */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center text-gray-600 px-4 py-2">
                Filter by Service
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {serviceTypes.map((service) => (
                  <DropdownMenuItem key={service} onClick={() => setServiceFilter(service)}>
                    {service}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => setServiceFilter(null)}>Reset Service</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Status Filter */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center text-gray-600 px-4 py-2">
                Filter by Status
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {statusFlow.map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                    {status}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>Reset Status</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator />

      {loading ? (
        'Loading...'
      ) : (
        <DataTable columns={columns} data={filteredCases} />
      )}

      <div className="flex justify-end space-x-2 py-2">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {pageNumber} of {Math.ceil(totalRecords / limit)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pageNumber + 1)}
            disabled={pageNumber >= Math.ceil(totalRecords / limit)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default CaseManagementClient;
