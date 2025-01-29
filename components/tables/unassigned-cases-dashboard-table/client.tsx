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
import { getUnassignedCases } from '@/app/redux/actions/dashboardAction';

const UnassignedCasesClient: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { unassignedCases, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(unassignedCases);
  const [filteredCases, setFilteredCases] = useState(unassignedCases || []); // State for filtered users


  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getUnassignedCases({ page: 1, limit: 20 }))
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
    let filtered = unassignedCases;

    // Apply search filter
    if (unassignedCases) {
      const lowerCasedSearchValue = searchTerm.toLowerCase();
      const newFilteredCases =
        searchTerm.trim() === ""
          ? unassignedCases // Show all users if no search value
          : unassignedCases.filter((cases: any) =>
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
  }, [unassignedCases, searchTerm, statusFilter]);

  // const handleSearch = (value: string) => setSearchTerm(value);

  // const handleStatusFilterChange = (serviceName: string) => {
  //   setFilterType(serviceName || 'By type');
  //   setStatusFilter(serviceName || null);
  // };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Unassigned Cases (${unassignedCases?.length})`}
          description=""
        />
        {/* <div className="flex space-x-2 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search by service name or assigned employee"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
          />
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
              {filterType} <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
        </div> */}
      </div>

      <Separator />

      {loading ? (
        'Loading...'
      ) : filteredData.length === 0 ? (
        <div className="mt-4 mb-6 bg-white text-center py-4 rounded shadow">
        No Unassigned Cases found.
      </div>
      ) : (
        <DataTable
          searchKeys={['ServiceId.serviceName']}
          columns={columns}
          data={filteredData}
        />
      )}
    </>
  );
};

export default UnassignedCasesClient;
