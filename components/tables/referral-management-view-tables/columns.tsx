'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { ReferralManagementView } from '@/constants/referral-management-view-data';
import { Phone } from 'lucide-react';
import { format } from 'date-fns';

export const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  // {
  //   accessorKey: 'id',
  //   header: 'ID'
  // },
  {
    accessorKey: 'referredBy',
    header: 'Referred By',
    cell: ({ row }) => {
      const { UserId, ReferrerCoupon } = row.original;

      const { FirstName,LastName, MobileNo } = UserId || {};
      const { CouponCode, Status, Expired } = ReferrerCoupon || {};

      return (
        <div className="p-2 border rounded-lg shadow-md bg-yellow-50">
          <table className="min-w-full bg-white border border-yellow-200">
            <tbody>
              <tr className="border-b border-yellow-200">
                <td className="p-2 font-semibold text-yellow-700">Name:</td>
                <td className="p-2 text-yellow-800">{FirstName+' '+LastName || 'N/A'}</td>
              </tr>
              <tr className="border-b border-yellow-200">
                <td className="p-2 font-semibold text-yellow-700">Number:</td>
                <td className="p-2 text-yellow-800 flex items-center"><span>{MobileNo || 'N/A'}</span></td>
              </tr>
              <tr className="border-b border-yellow-200">
                <td className="p-2 font-semibold text-yellow-700">Coupon Code:</td>
                <td className="p-2 text-yellow-800">{CouponCode || 'N/A'}</td>
              </tr>
              <tr className="border-b border-yellow-200">
                <td className="p-2 font-semibold text-yellow-700">Coupon Status:</td>
                <td className="p-2 font-semibold text-yellow-700">
                  <span
                    className={`py-1 px-2 text-white ${Status === 'Active' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                  >
                    {Status === 'Active' ? 'Unused' : 'Used'}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-yellow-700">Expired:</td>
                <td className={`p-2 text-yellow-800 ${Expired ? 'font-bold' : 'text-gray-600'}`}>
                  <span
                    className={`py-1 px-2 text-white ${Expired ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                  >
                    {Expired ? 'Yes' : 'No'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
  ,
  // {
  //   accessorKey: 'referredTo',
  //   header: 'Referred To',
  //   cell: ({ row }) => {
  //     const { name, number, couponCode, couponStatus, expired } = row.original.referredTo;

  //     return (
  //       <div className="p-2 border rounded-lg shadow-md bg-yellow-50">
  //         <table className="min-w-full bg-white border border-yellow-200">
  //           <tbody>
  //             <tr className="border-b border-yellow-200">
  //               <td className="p-2 font-semibold text-yellow-700">Name:</td>
  //               <td className="p-2 text-yellow-800">{name}</td>
  //             </tr>
  //             <tr className="border-b border-yellow-200">
  //               <td className="p-2 font-semibold text-yellow-700">Number:</td>
  //               <td className="p-2 text-yellow-800 flex items-center"><span>{number}</span></td>
  //             </tr>
  //             <tr className="border-b border-yellow-200">
  //               <td className="p-2 font-semibold text-yellow-700">Coupon Code:</td>
  //               <td className="p-2 text-yellow-800">{couponCode}</td>
  //             </tr>
  //             <tr className="border-b border-yellow-200">
  //               <td className="p-2 font-semibold text-yellow-700">Coupon Status:</td>
  //               <td className="p-2 font-semibold text-yellow-700"  >
  //                 <span className={`  py-1  px-2   text-white  ${couponStatus === 'Used' ? 'bg-red-500  ' : 'bg-yellow-500'}`} > {couponStatus}</span>
  //               </td>
  //             </tr>
  //             <tr>
  //               <td className="p-2 font-semibold text-yellow-700">Expired:</td>
  //               <td className={`p-2 text-yellow-800 ${expired ? 'font-bold' : 'text-gray-600'}`}>
  //                 <span className={`  py-1  px-2   text-white ${expired === true ? 'bg-red-500  ' : 'bg-yellow-500'}`} >  {expired ? 'Yes' : 'No'}</span>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </div>
  //     );
  //   }
  // }
  {
    accessorKey: 'referredTo',
    header: 'Referred To',
    cell: ({ row }) => {
      const { Referee, RefereeCoupon } = row.original;
  
      const { FirstName: name, MobileNo: number } = Referee || {};
      const { CouponCode, Status, Expired } = RefereeCoupon || {};
  
      return (
        <div className="p-2 border rounded-lg shadow-md bg-yellow-50">
          <table className="min-w-full bg-white border border-yellow-200">
            <tbody>
              <tr className="border-b border-yellow-200">
                <td className="p-2 font-semibold text-yellow-700">Name:</td>
                <td className="p-2 text-yellow-800">{name || 'N/A'}</td>
              </tr>
              <tr className="border-b border-yellow-200">
                <td className="p-2 font-semibold text-yellow-700">Number:</td>
                <td className="p-2 text-yellow-800">{number || 'N/A'}</td>
              </tr>
              <tr className="border-b border-yellow-200">
                <td className="p-2 font-semibold text-yellow-700">Coupon Code:</td>
                <td className="p-2 text-yellow-800">{CouponCode || 'N/A'}</td>
              </tr>
              <tr className="border-b border-yellow-200">
                <td className="p-2 font-semibold text-yellow-700">Coupon Status:</td>
                <td className="p-2">
                  <span
                    className={`py-1 px-2 text-white ${
                      Status === 'active' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  >
                    {Status === 'active' ? 'Unused' : 'Used'}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-2 font-semibold text-yellow-700">Expired:</td>
                <td className="p-2">
                  <span
                    className={`py-1 px-2 text-white ${
                      Expired ? 'bg-red-500' : 'bg-yellow-500'
                    }`}
                  >
                    {Expired ? 'Yes' : 'No'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Referred Date',
    // cell: ({ row }) => (
    //   <span>{row.original?.createdAt}</span>
    // )
    cell: ({ row }) => {
      const date = row.original?.createdAt;
      return date ? format(new Date(date), 'dd-MMM-yyyy') : 'N/A';
    },
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => {
      const statusText = row.original.Status === 'Successful' ? 'Purchased' : 'Pending';
      const statusColor = row.original.Status === 'Successful' ? 'bg-yellow-400' : 'bg-red-400';
  
      return (
        <div
          style={{ borderRadius: "20px" }}
          className={`flex items-center justify-center px-2 py-1 ${statusColor}`}
        >
          <span className="text-black font-bold">{statusText}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];