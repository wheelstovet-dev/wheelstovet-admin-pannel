'use client';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';
import { getAllUsers } from '@/app/redux/actions/userAction';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const UserClient: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchValue, setSearchValue] = useState<string>("");

  const { users, loading, error } = useSelector((state: RootState) => state.user);

  // Search Filter: FirstName & Mobile Number
  useEffect(() => {
    const lowerCasedSearchValue = searchValue.toLowerCase();
    const newFilteredUsers = data.filter((user: any) => 
      user.FirstName?.toLowerCase().includes(lowerCasedSearchValue) || 
      user.MobileNo?.toString().includes(searchValue)
    );
    setFilteredUsers(newFilteredUsers);
  }, [data, searchValue]);

  // Fetch Users
  const getAllUsersData = async () => {
    dispatch(setLoading(true));
    try {
      const resultAction: any = await dispatch(getAllUsers({ page: pageNumber, limit: limit }));

      if (resultAction.type === 'users/getAll/fulfilled') {
        setData(resultAction?.payload?.data);
        setFilteredUsers(resultAction?.payload?.data);
        setLoader(false);
        setTotalRecords(resultAction?.payload?.pagination?.total);
      } else {
        throw new Error(resultAction.payload?.message.message || 'Failed to fetch users');
      }
    } catch (error: any) {
    
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, [pageNumber, limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNumber(newPage);
    }
  };

  const handleRowClick = (data: any) => {
    if (data?._id) {
      router.push(`/view-user?id=${data._id}`);
    }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Users `} description="" />
        {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by First Name or Mobile No"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-80 px-4 py-2 border rounded-md"
        />
      </div>
      </div>
      

      <Separator />

      {loader ? 'Loading...' : (
        <DataTable
          searchKeys={["name"]}
          columns={columns}
          data={filteredUsers} // Use filteredUsers instead of data
          onRowClick={handleRowClick}
          stopPropagationSelectors={[".user-action"]}
        />
      )}

      {/* Pagination */}
      {/* <div className="flex justify-end space-x-2 py-2">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>
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
      </div> */}
    </>
  );
};
