'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Heading } from '@/components/ui/heading';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { ChevronDown } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { getAllCases } from '@/app/redux/actions/casesAction';

const CaseManagementClient: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { cases, loading, error } = useSelector((state: RootState) => state.caseManagement);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(cases);
  const [filteredCases, setFilteredCases] = useState(cases || []); // State for filtered users


  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getAllCases({ page: 1, limit: 20 }))
      .unwrap()
      .catch((err: any) => {
        ToastAtTopRight.fire({
          icon: 'error',
          title: err.message || 'Failed to fetch cases',
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  // useEffect(() => {
  //   if (cases) {
  //     const lowerCasedSearchValue = searchTerm.toLowerCase();
  //     const newFilteredCases =
  //       searchTerm.trim() === ""
  //         ? cases // Show all users if no search value
  //         : cases.filter((cases: any) =>
  //             cases?.ServiceId?.serviceName.toLowerCase().includes(lowerCasedSearchValue)
  //           );
  //         console.log(newFilteredCases);
  //     setFilteredCases(newFilteredCases);
  //   }
  // }, [cases, searchTerm]);

  useEffect(() => {
    let filtered = cases;

    // Apply search filter
    if (cases) {
      const lowerCasedSearchValue = searchTerm.toLowerCase();
      const newFilteredCases =
        searchTerm.trim() === ""
          ? cases // Show all users if no search value
          : cases.filter((cases: any) =>
              cases?.ServiceId?.serviceName.toLowerCase().includes(lowerCasedSearchValue)
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
      filtered = filtered.filter((item: any) => item.ServiceId.serviceName === statusFilter);
    }

    setFilteredData(filtered);
  }, [cases, searchTerm, statusFilter]);

  const handleSearch = (value: string) => setSearchTerm(value);

  const handleStatusFilterChange = (serviceName: string) => {
    setFilterType(serviceName || 'By type');
    setStatusFilter(serviceName || null);
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`All Cases (${filteredData?.length})`}
          description="Manage Cases"
        />
        <div className="flex space-x-2 w-full max-w-3xl ml-auto justify-end"> {/* Added ml-auto */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
              {filterType} <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"> {/* Aligning dropdown to the right */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center text-gray-600 px-4 py-2">
                  Sort by Service
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {['Salon Visit', 'Vet Visit', 'To Hostel', 'Pet Taxi', 'Pet Handling'].map(
                    (service) => (
                      <DropdownMenuItem
                        key={service}
                        onClick={() => handleStatusFilterChange(service)}
                      >
                        {service}
                      </DropdownMenuItem>
                    )
                  )}
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterType('By type');
                      setStatusFilter(null);
                    }}
                  >
                    Reset
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>


      <Separator />

      {loading ? (
        'Loading...'
      ) : (
        <DataTable
          searchKeys={['serviceName', 'assignedEmployee']}
          columns={columns}
          data={filteredData}
          onSearch={handleSearch}
        />
      )}
    </>
  );
};

export default CaseManagementClient;
