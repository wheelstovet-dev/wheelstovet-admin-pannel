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
  const subscriptionId = searchParams.get('subscriptionId'); // Get the subscription ID from URL
  const caseId = searchParams.get('caseId'); // Get the case ID from URL

  const [data, setData] = useState<any>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);

  const { assignmentStatus, loading } = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    getAllEmployeesData();
  }, []);

  const getAllEmployeesData = async () => {
    dispatch(setLoading(true));
    try {
      const resultAction: any = await dispatch(getAllEmployees({ page: 1, limit: 10 }));
      if (resultAction.type === 'employees/getAll/fulfilled') {
        setData(resultAction?.payload?.data);
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

  const handleAssignEmployee = async () => {
    const id = subscriptionId || caseId;
    
    // Check if both `selectedEmployeeId` and `id` are present before proceeding
    if (!selectedEmployeeId || !id) return;

    setLoader(true);
    try {
      if (subscriptionId) {
        // Assign to subscription
        const response = await dispatch(assignEmployee({ id: subscriptionId, employeeId: selectedEmployeeId })).unwrap();
        if (response.status) {
          ToastAtTopRight.fire({
            icon: 'success',
            title: 'Employee assigned to subscription successfully!',
          });
          router.push('/subscription-management');
        }
      } else if (caseId) {
        // Assign to case
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

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Employee (${data.length})`}
          description="Manage Employee"
        />
        <Button
          className="text-xs md:text-sm bg-yellow-500 hover:bg-yellow-600"
          onClick={() => router.push(`/employee-form`)}
        >
          Add New
        </Button>
      </div>

      {/* Conditionally render Assign button if subscriptionId or caseId is present */}
      {(subscriptionId || caseId) && (
        <div className="flex justify-end">
          <Button
            className="text-xs md:text-sm bg-yellow-500 hover:bg-yellow-600"
            onClick={handleAssignEmployee}
            disabled={!selectedEmployeeId || loader}
          >
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
                        className={`text-xs ${selectedEmployeeId === row.original._id ? 'bg-blue-500' : 'bg-green-500'}`}
                        onClick={() => setSelectedEmployeeId(row.original._id)} // Set selected employee ID
                      >
                        Select
                      </Button>
                    ),
                    header: 'Select',
                  },
                ]
              : []),
          ]}
          data={data}
        />
      )}
    </>
  );
};
