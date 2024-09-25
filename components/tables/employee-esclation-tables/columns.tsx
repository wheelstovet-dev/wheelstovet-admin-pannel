'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Check, Edit, X } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'; // Adjust the import path as necessary
import { EmplpoyeeEsclated } from '@/constants/employee-esclated-data';


export const columns: ColumnDef<EmplpoyeeEsclated>[] = [
//   {
//     accessorKey: 'caseId',
//     header: 'Case ID',
//     cell: ({ row }) => <span>{row.original.caseId}</span>,
//   },
//   {
//     accessorKey: 'empId',
//     header: 'Emp ID',
//     cell: ({ row }) => <span>{row.original.empId}</span>,
//   },
  {
    accessorKey: 'userName',
    header: 'User Name',
    cell: ({ row }) => <span>{row.original.userName}</span>,
  },
  {
    accessorKey: 'assignedEmployee',
    header: 'Assigned Employee',
    cell: ({ row }) => <span>{row.original.assignedEmployee}</span>,
  },
//   {
//     accessorKey: 'subscriptionType',
//     header: 'Subscription Type',
//   },
  
{
    accessorKey: 'userNote',
    header: 'User Note',
    cell: ({ row }) => (
      <div className="flex">
        <span className=''>{row.original.userNote}</span>
      </div>
    ),
  },

  {
    accessorKey: 'specialInstructions',
    header: 'Special Instructions',
    cell: ({ row }) => (
      <div className="flex">
        <span className=''>{row.original.specialInstructions}</span>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];