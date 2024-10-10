'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Enquiry, EnquiryData } from '@/constants/enquiry-data';

export const EnquiryClient: React.FC = () => {
  const router = useRouter();
  const initialData: Enquiry[] = EnquiryData;
  const [data, setData] = useState<Enquiry[]>(initialData);


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Enquiry`}
          description=""
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/order`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable
        // searchKey=" assignedEmployee"
        columns={columns}
        data={data}
      />
    </>
  );
};