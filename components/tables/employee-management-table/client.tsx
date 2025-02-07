'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useRouter, useSearchParams } from 'next/navigation';
import { columns } from './columns';
import { FaUserCheck } from 'react-icons/fa';
import { setLoading } from '@/app/redux/slices/authslice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { assignEmployee, assignEmployeeByCase, getAllEmployees } from '@/app/redux/actions/employeeAction';
import { AppDispatch, RootState } from '@/app/redux/store';
import { Row } from '@tanstack/react-table';

export const EmployeeManagementClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');
  const caseId = searchParams.get('caseId');

  const [data, setData] = useState<any>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchValue, setSearchValue] = useState<string>('');

  const { employees, loading } = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    getAllEmployeesData();
  }, [pageNumber, limit]);

  const getAllEmployeesData = async () => {
    dispatch(setLoading(true));
    try {
      const resultAction: any = await dispatch(getAllEmployees({ page: pageNumber, limit: limit }));
      if (resultAction.type === 'employees/getAll/fulfilled') {
        setData(resultAction?.payload?.data);
        setFilteredEmployees(resultAction?.payload?.data);
        setTotalRecords(resultAction?.payload?.pagination?.total);
      } else {
        throw new Error(resultAction.payload.message || 'Failed to fetch employees');
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message || 'Failed to get employees',
      });
    } finally {
      setLoader(false);
      dispatch(setLoading(false));
    }
  };

  // Search Filter: First Name & Mobile Number
  useEffect(() => {
    const lowerCasedSearchValue = searchValue.toLowerCase().trim();
    const newFilteredEmployees = data.filter((employee: any) => {
      const NameMatches = employee.Name?.toLowerCase().includes(lowerCasedSearchValue);
      const roleMatches = employee.Role?.toLowerCase().includes(lowerCasedSearchValue);
      const mobileMatches = employee.MobileNo?.toString().includes(searchValue);
      return NameMatches ||roleMatches|| mobileMatches;
    });

    setFilteredEmployees(newFilteredEmployees);
  }, [data, searchValue]);

  const handleAssignEmployee = async () => {
    const id = subscriptionId || caseId;

    if (!selectedEmployeeId || !id) return;

    setLoader(true);
    try {
      if (subscriptionId) {
        const response = await dispatch(assignEmployee({ id: subscriptionId, employeeId: selectedEmployeeId })).unwrap();
        if (response.status) {
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'Employee assigned to subscription successfully!',
          });
          router.push('/subscription-management');
        }
      } else if (caseId) {
        const response = await dispatch(assignEmployeeByCase({ caseId, employeeId: selectedEmployeeId })).unwrap();
        if (response.status) {
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'Employee assigned to case successfully!',
          });
          router.push('/case-management');
        }
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'Employee already assigned or failed to assign',
      });
    } finally {
      setLoader(false);
    }
  };

  const handleRowClick = (data: any) => {
    if (data?._id) {
      router.push(`/employee-form?mode=view&id=${data._id}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNumber(newPage);
    }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Employee (${totalRecords})`} description="Manage Employee" />
        <Button className="text-xs md:text-sm bg-yellow-500 hover:bg-yellow-600" onClick={() => router.push(`/employee-form`)}>
          Add New
        </Button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name or Role or Mobile No"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {(subscriptionId || caseId) && (
        <div className="flex justify-end">
          <Button className="text-xs md:text-sm bg-yellow-500 hover:bg-yellow-600" onClick={handleAssignEmployee} disabled={!selectedEmployeeId || loader}>
            <FaUserCheck className="mr-2 h-4 w-4" /> Assign
          </Button>
        </div>
      )}

      <Separator />

      {loader ? (
        'Loading...'
      ) : (
        <DataTable
          searchKeys={["fullName"]}
          columns={[
            ...columns,
            ...(subscriptionId || caseId
              ? [
                  {
                    accessorKey: 'actions',
                    cell: ({ row }: { row: Row<any> }) => (
                      <Button
                        className={`text-xs select-button ${selectedEmployeeId === row.original._id ? 'bg-blue-500' : 'bg-green-500'}`}
                        onClick={() => setSelectedEmployeeId(row.original._id)}
                      >
                        Select
                      </Button>
                    ),
                    header: 'Select',
                  },
                ]
              : []),
          ]}
          data={filteredEmployees} // Use filteredEmployees instead of data
          onRowClick={handleRowClick}
          stopPropagationSelectors={[".employee-status", ".emp-action", ".select-button"]}
        />
      )}

      <div className="flex justify-end space-x-2 py-2">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {pageNumber} of {Math.ceil(totalRecords / limit)}
          </span>
          <Button variant="outline" size="sm" onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber >= Math.ceil(totalRecords / limit)}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
