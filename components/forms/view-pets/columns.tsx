// columns.tsx

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Calendar } from 'lucide-react';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'Name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.Name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Species',
    header: 'Species',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.Species}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Age',
    header: 'Age',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.Age}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Breed',
    header: 'Breed',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.Breed}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Temperament',
    header: 'Temperament',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.Temperament}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Behavior',
    header: 'Behavior',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.Behavior}</span>
      </div>
    ),
  },
  {
    accessorKey: 'HealthIssue',
    header: 'Health Issue',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.HealthIssue}</span>
      </div>
    ),
  },
  {
    accessorKey: 'CreatedAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Calendar className="text-blue-500 mr-2" width={16} height={16} />
        <span className="text-[12px]">{new Date(row.original.CreatedAt).toLocaleDateString()}</span>
      </div>
    ),
  },
  {
    accessorKey: 'UpdatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Calendar className="text-blue-500 mr-2" width={16} height={16} />
        <span className="text-[12px]">{new Date(row.original.UpdatedAt).toLocaleDateString()}</span>
      </div>
    ),
  },
];
