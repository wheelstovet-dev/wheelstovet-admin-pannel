'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAssignedSubscriptionById } from '@/app/redux/actions/employeeAction';
import { ToastAtTopRight } from '@/lib/sweetalert';

export const AssignedSubscriptionClient: React.FC = () => {
  // Parse the URL to get the 'id' parameter
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const dispatch = useDispatch<AppDispatch>();
  const { assignedSubscription, loading } = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    if (id) {
      dispatch(getAssignedSubscriptionById(id));
    }
  }, [dispatch, id]);

  console.log('Assigned Subscription:', assignedSubscription);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Assigned Subscription (${assignedSubscription?.length || 0})`}
          description=""
        />
      </div>
      <Separator />

      {loading || (assignedSubscription?.length === 0 && 'loading') ? (
        'No assigned subscription found'
      ) : (
        <DataTable
          // searchKey="type"
          columns={columns}
          data={assignedSubscription}
          // onSearch={handleSearch}
          // filters={filters}
          // rowNo={0}
          // onSort={handleSort}
        />
      )}
    </>
  );
};
