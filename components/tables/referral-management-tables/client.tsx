'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { ReferralManagement, ReferralManagementData } from '@/constants/referral-management-data';

interface ReferralManagementClientProps {
  initialData: any[];
  loading:boolean;
}

export const ReferralManagementClient: React.FC<ReferralManagementClientProps> = ({initialData,loading}) => {
  
  // const initialData: ReferralManagement[] = ReferralManagementData;
  const [data, setData] = useState<any[]>(initialData || []);

  useEffect(() => {
    setData(initialData || []);
  }, [initialData]);


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Referral Coupons (${data.length})`}
          description="Manage and view referral coupons (Client side table functionalities.)"
        />
      </div>
      <Separator />
      {loading ? 'Loading...' : (
      <DataTable
        searchKeys={["couponCode"]}
        columns={columns}
        data={data}
      />
      )}
    </>
  );
};