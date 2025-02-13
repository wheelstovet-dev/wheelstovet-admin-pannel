// columns.tsx

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'Name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="text-center">
        <span>{row.original.Name || 'N/A'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Species',
    header: 'Species',
    cell: ({ row }) => (
      <div className="text-center">
        <span>{row.original.Species || 'N/A'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Age',
    header: 'Age',
    cell: ({ row }) => (
      <div className="text-center">
        <span>{row.original.Age ?? 'N/A'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Breed',
    header: 'Breed',
    cell: ({ row }) => (
      <div className="text-center">
        <span>{row.original.Breed || 'N/A'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Temperament',
    header: 'Temperament',
    cell: ({ row }) => (
      <div className="text-center">
        <span>{row.original.Temperament || 'N/A'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Behavior',
    header: 'Behavior',
    cell: ({ row }) => (
      <div className="text-center">
        <span>{row.original.Behavior || 'N/A'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'HealthIssue',
    header: 'Health Issue',
    cell: ({ row }) => (
      <div className="text-center">
        <span>{row.original.HealthIssue || 'N/A'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'CreatedAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div className="text-center">
        <span>
          {row.original.CreatedAt ? format(new Date(row.original.CreatedAt), 'dd-MMM-yyyy') : 'N/A'}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'UpdatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <div className="text-center">
        <span>
          {row.original.UpdatedAt ? format(new Date(row.original.UpdatedAt), 'dd-MMM-yyyy') : 'N/A'}
        </span>
      </div>
    ),
  },
];
