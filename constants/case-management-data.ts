'use client';

// Define the CaseManagementUser interface
export interface CaseManagementUser {
  caseId: string;
  userId: string;
  serviceName: string;
  currentStatus: string;
  assignedEmployee: string;
  date: string;
  timeSlot: string;
}

// Dummy data for case management
export const CaseManagementData: CaseManagementUser[] = [
  {
    caseId: '101',
    userId: 'USR001',
    serviceName: 'Dog Walking',
    currentStatus: 'Pending',
    assignedEmployee: 'John Doe',
    date: '2023-09-01',
    timeSlot: '10:00 AM',
  },
  {
    caseId: '102',
    userId: 'USR002',
    serviceName: 'Pet Grooming',
   currentStatus: 'Completed',
    assignedEmployee: 'Jane Smith',
    date: '2023-09-02',
    timeSlot: '02:00 PM',
  },
  {
    caseId: '103',
    userId: 'USR003',
    serviceName: 'Veterinary Checkup',
   currentStatus: 'In Progress',
    assignedEmployee: 'Mike Johnson',
    date: '2023-09-03',
    timeSlot: '11:00 AM',
  },
  {
    caseId: '104',
    userId: 'USR004',
    serviceName: 'Pet Taxi',
   currentStatus: 'Canceled',
    assignedEmployee: 'Emily Davis',
    date: '2023-09-04',
    timeSlot: '09:00 AM',
  },
  {
    caseId: '105',
    userId: 'USR005',
    serviceName: 'Dog Walking',
   currentStatus: 'Pending',
    assignedEmployee: 'John Doe',
    date: '2023-09-05',
    timeSlot: '03:00 PM',
  },
  {
    caseId: '106',
    userId: 'USR006',
    serviceName: 'Pet Grooming',
   currentStatus: 'Completed',
    assignedEmployee: 'Jane Smith',
    date: '2023-09-06',
    timeSlot: '12:00 PM',
  },
];
