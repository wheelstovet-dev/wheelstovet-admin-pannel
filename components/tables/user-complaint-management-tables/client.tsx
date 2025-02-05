'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { AppDispatch, RootState } from '@/app/redux/store';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { columns } from './columns';
import { getAllComplaints } from '@/app/redux/actions/complaintAction';
import { Button } from '@/components/ui/button';

const ComplaintManagementUserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { complaints, loading, error } = useSelector(
    (state: RootState) => state.complaintManagement
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(complaints);
  const [pageNumber,setPageNumber]=useState(1);
  const [limit,setLimit]=useState(5);
  const [totalRecords,setTotalRecords]=useState(0);

  const getAllComplaintsData = async () => {
    // dispatch(setLoading(true)); // Assuming you have a loading state setter
  
    try {
      const resultAction: any = await dispatch(getAllComplaints({ page: pageNumber, limit: limit }));
  
      if (resultAction.type === 'complaints/getAll/fulfilled') {
        setFilteredData(resultAction?.payload?.data); // Update state with fetched data
        setTotalRecords(resultAction?.payload?.pagination?.total);
      } else {
        throw new Error(resultAction.payload?.message?.message || 'Failed to fetch complaints');
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message || 'Failed to fetch complaints',
      });
    } finally {
      // dispatch(setLoading(false));
    }
  };
  
  useEffect(() => {
    getAllComplaintsData();
  }, [pageNumber, limit]); // Runs when page or limit changes
  

  
  useEffect(() => {
    setFilteredData(complaints);
    resetFilters();
  }, [complaints]);
  

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    const filtered = complaints.filter((item: any) =>
      item.Description.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };
  

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    const filtered = status
      ? complaints.filter((item: any) => item.Status.toLowerCase() === status.toLowerCase())
      : complaints;
    setFilteredData(filtered);
  };
  

  const handleComplaintByFilterChange = (complaintBy: string) => {
    setFilterType(`By ${complaintBy}`);
    const filtered = complaintBy
      ? complaints.filter((item: any) => item.ComplaintBy.toLowerCase() === complaintBy.toLowerCase())
      : complaints;
    setFilteredData(filtered);
  };
  
  const resetFilters = () => {
    setFilterType('By type');
    setStatusFilter(null);
    setSearchTerm('');
    setFilteredData(complaints);
  };
  

  const filters = [
    {
      label: 'Status',
      subOptions: ['pending','inprogress', 'resolved'],
    },
    {
      label: 'Complaint By',
      subOptions: ['User', 'Employee'],
    },
    {
      label: 'Reset',
      subOptions: ['User', 'Employee'],
    },
  ];

  const handlePageChange=(newPage:number)=>{
    if(newPage>0 && newPage<=Math.ceil(totalRecords/limit)){
      setPageNumber(newPage);
    }
  }
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`All Complaints (${totalRecords})`} description="Manage Complaints" />
      </div>
      <div className="flex justify-between items-center mb-1">
        <input
          type="text"
          placeholder="Search by description"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
            {filterType} <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {filters.map((filter) =>
              filter.label === 'Reset' ? (
                // Standalone Reset Option
                <DropdownMenuItem
                  key={filter.label}
                  onClick={() => {
                    resetFilters();
                  }}
                  className="font-semibold text-red-500 hover:bg-red-100"
                >
                  {filter.label}
                </DropdownMenuItem>
              ) : (
                // Regular Filter Options with Sub-menus
                <DropdownMenuSub key={filter.label}>
                  <DropdownMenuSubTrigger className="flex items-center justify-between">
                    {filter.label}
                  </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent>
                    {filter.subOptions.map((subOption) => (
                      <DropdownMenuItem
                        key={subOption}
                        onClick={() => {
                          if (filter.label === 'Status') {
                            handleStatusFilterChange(subOption);
                          } else if (filter.label === 'Complaint By') {
                            handleComplaintByFilterChange(subOption);
                          }
                        }}
                      >
                        {subOption}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <Separator />
      {loading ? 'Loading...' : (
        <DataTable
          searchKeys={["description"]}
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

export default ComplaintManagementUserPage;
