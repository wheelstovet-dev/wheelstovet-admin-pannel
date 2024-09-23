'use client';


export interface AssignedCase {
  caseId: string;
  assignedService: string;
  status: string;
  assignedDate: string;
  timeSlot: string;
}


export const AssignedCaseData: AssignedCase[] = [
  {
    caseId: '101',
    
    assignedService: 'Dog Walking',
    status: 'Pending',
  
    assignedDate: '2023-09-01',
    timeSlot: '10:00 AM',
  },
  {
    caseId: '102',
   
    assignedService: 'Pet Grooming',
   status: 'Completed',
 
    assignedDate: '2023-09-02',
    timeSlot: '02:00 PM',
  },
  {
    caseId: '103',
    
    assignedService: 'Veterinary Checkup',
   status: 'In Progress',
   
    assignedDate: '2023-09-03',
    timeSlot: '11:00 AM',
  },
  {
    caseId: '104',
   
    assignedService: 'Pet Taxi',
   status: 'Canceled',

    assignedDate: '2023-09-04',
    timeSlot: '09:00 AM',
  },
  {
    caseId: '105',
   
    assignedService: 'Dog Walking',
   status: 'Pending',
  
    assignedDate: '2023-09-05',
    timeSlot: '03:00 PM',
  },
  {
    caseId: '106',
    
    assignedService: 'Pet Grooming',
   status: 'Completed',
   
    assignedDate: '2023-09-06',
    timeSlot: '12:00 PM',
  },
];
