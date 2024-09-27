'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Heading } from '@/components/ui/heading';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { ChevronDown, FileText} from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { CaseFinance, CaseFinanceData } from '@/constants/case-financial';

const CaseFinanceClient: React.FC = () => {
  const router = useRouter();
  const initialData: CaseFinance[] = CaseFinanceData;
  const [data, setData] = useState<CaseFinance[]>(initialData);
  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('By type');
//   const [statusFilter, setStatusFilter] = useState<string | null>(null);



  return (
    <>
    {/* <div className="flex justify-end space-x-2">
          <Button variant="outline" className="flex text-white bg-yellow-500   hover:bg-yellow-600 hover:text-white items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ">
            <FileText height={16}  className="mr-2" />
           View Invoice
          </Button>
          
        </div> */}
    <div className="flex items-start justify-between">
    <Heading
          title={`View Finance (${data.length})`}
          description="View Finanace"
        />
            <div className="flex space-x-2 w-full max-w-3xl">
              {/* <input
                type="text"
                placeholder="Search by pet name or assigned employee"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
              /> */}
              {/* <div className="hidden items-center space-x-2 md:flex">
                <CalendarDateRangePicker />
              </div>
              */}
            </div>
    </div>
         
    <Separator />
     
      <DataTable
        searchKeys={['name']}
        columns={columns}
        data={data}
        // onSearch={handleSearch}
        // filters={filters}
      />
     
    </>
  );
};

export default CaseFinanceClient;
