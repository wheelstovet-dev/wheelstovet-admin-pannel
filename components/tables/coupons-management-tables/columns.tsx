'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { format } from 'date-fns';


export const columns: ColumnDef<any>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: true,
  //   enableHiding: false
  // },
  {
    accessorKey: 'id',
    header: 'Sno',
    cell: ({ row }) => row.index + 1,
    size: 100, // Increased column width
  },
  {
    accessorKey: 'CouponCode',
    header: 'Coupon Code',
    cell: ({ row }) => row.original?.CouponCode,
    size: 250, // Increased column width
  },
  {
    accessorKey: 'Image',
    header: 'Image',
    cell: ({ row }) => (
      <div className="flex items-center">
        {/* <Image src={row.original?.Image} alt={row.original?.CouponCode} width={50} height={50} loading='lazy' /> */}
        {/* <Image src="https://plus.unsplash.com/premium_photo-1671076131210-5376fccb100b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGNvdXBvbnxlbnwwfHwwfHx8MA%3D%3D" alt={row.original?.CouponCode} width={50} height={50} loading='lazy' />       */}
      </div>
    ),
    size: 300, // Increased column width
  },
  {
    accessorKey: 'DiscountType',
    header: 'Discount Type',
    cell: ({ row }) => `${row.original?.DiscountType}`,
    size: 300, // Increased column width
  },
  {
    accessorKey: 'CouponType',
    header: 'Coupon Type',
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.CouponType ? row.original?.CouponType : 'N/A'}
      </div>
    ),
    size: 250, // Increased column width
  },
  // {
  //   accessorKey: 'subscriptionPrice',
  //   header: 'Subscription Price',
  //   cell: ({ row }) => row.original.subscriptionPrice ? `₹${row.original.subscriptionPrice}` : 'N/A',
  //   size: 200, // Increased column width
  // },
 
  {
    accessorKey: 'StartDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const date = row.original?.StartDate;
      return date ? format(new Date(date), 'dd-MMM-yyyy') : 'N/A';
    },  
    size: 200, // Increased column width
  },
  {
    accessorKey: 'EndDate',
    header: 'End Date',
    cell: ({ row }) => {
      const date = row.original?.EndDate;
      return date ? format(new Date(date), 'dd-MMM-yyyy') : 'N/A';
    },  
    size: 200, 
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="text-center">
        <CellAction data={row.original} />
      </div>
    ),
    size: 200, // Set the width for the column
  }
  
];
