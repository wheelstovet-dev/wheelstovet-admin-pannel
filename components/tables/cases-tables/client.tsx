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
import { Button } from '@/components/ui/button';

const CaseManagementClient: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { cases, loading, error } = useSelector((state: RootState) => state.caseManagement);

  const [pageNumber,setPageNumber]=useState(1);
  const [limit,setLimit]=useState(5);
  const [totalRecords,setTotalRecords]=useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(cases);
  const [casesData, setCasesData] = useState(cases || []); // State for filtered users


  const getAllCasesData = async () => {
       dispatch(setLoading(true)); // Assuming you have a loading state setter
    
      try {
        const resultAction: any = await dispatch(getAllCases({ page: pageNumber, limit: limit }));
    
        //console.log("resultAction.type",resultAction.type);
        if (resultAction.type === 'cases/getAll/fulfilled') {
          setCasesData(resultAction?.payload?.data); // Update state with fetched data
          setTotalRecords(resultAction?.payload?.pagination?.total);
          //console.log("resultAction",resultAction.payload?.message);
        } else {
          throw new Error(resultAction.payload?.message || 'Failed to fetch cases');
        }
      } catch (error: any) {
        ToastAtTopRight.fire({
          icon: 'error',
          title:'Failed to fetch cases',
        });
      } finally {
        // dispatch(setLoading(false));
      }
    };
    
    useEffect(() => {
      getAllCasesData();
    }, [pageNumber, limit]); // Runs when pageNumber or limit changes

    const handlePageChange=(newPage:number)=>{
      if(newPage>0 && newPage<=Math.ceil(totalRecords/limit)){
        setPageNumber(newPage);
      }
    }

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
          setCasesData(newFilteredCases);
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
          title={`All Cases (${totalRecords})`}
          description=""
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
                  {['Salon Visit', 'Vet Visit', 'To Hostel', 'Pet Taxi'].map(
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
