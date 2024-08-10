'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { format } from 'date-fns';
import { CouponManagement } from '@/constants/coupons-management-data';

export const columns: ColumnDef<CouponManagement>[] = [
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
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: 'S.no',
    header: 'S.no',
    cell: ({ row }) => row.index + 1,
    size: 100, // Increased column width
  },
  {
    accessorKey: 'Code',
    header: 'Coupon Code',
    cell: ({ row }) => row.original.code,
    size: 250, // Increased column width
  },
  {
    accessorKey: 'Image',
    header: 'Image',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Image src={row.original.image} alt={row.original.code} width={50} height={50} />
      </div>
    ),
    size: 300, // Increased column width
  },
  {
    accessorKey: 'discountPrice',
    header: 'Discount Price',
    cell: ({ row }) => `₹${row.original.discountPrice}`,
    size: 300, // Increased column width
  },
  {
    accessorKey: 'subscriptionType',
    header: 'Subscription Type',
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.subscriptionType ? row.original.subscriptionType.name : 'N/A'}
      </div>
    ),
    size: 250, // Increased column width
  },
  {
    accessorKey: 'subscriptionPrice',
    header: 'Subscription Price',
    cell: ({ row }) => row.original.subscriptionPrice ? `₹${row.original.subscriptionPrice}` : 'N/A',
    size: 200, // Increased column width
  },
  {
    accessorKey: 'netPrice',
    header: 'Net Price',
    cell: ({ row }) => row.original.netPrice ? `₹${row.original.netPrice}` : 'N/A',
    size: 200, // Increased column width
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => row.original.startDate ? format(row.original.startDate, 'dd MMM yyyy') : 'N/A',
    size: 200, // Increased column width
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => row.original.endDate ? format(row.original.endDate, 'dd MMM yyyy') : 'N/A',
    size: 200, 
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />,
    size: 200, // Increased column width
  }
];
