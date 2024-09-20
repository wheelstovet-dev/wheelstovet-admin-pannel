
export interface EmployeeManagement {
    caseId: string;
    fullName: string;
    gender: string;
    phoneNumber: string;
    email: string;
    serviceAssigned: string;
    assigneddate: string;
    timeSlot: string;
    status: string;
  }
  

  export const EmployeeManagementData: EmployeeManagement[] = [
    {
      caseId: '101',
      fullName: 'Rahul Sharma',
      gender: 'Male',
      phoneNumber: '9876543210',
      email: 'rahul.sharma@example.in',
      serviceAssigned: 'Dog Walking',
      assigneddate: '2023-09-01',
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'Available',
    },
    {
      caseId: '102',
      fullName: 'Priya Nair',
      gender: 'Female',
      phoneNumber: '9876543220',
      email: 'priya.nair@example.in',
      serviceAssigned: 'Pet Grooming',
      assigneddate: '2023-09-02',
      timeSlot: '02:00 PM - 04:00 PM',
      status: 'Unavailable',
    },
    {
      caseId: '103',
      fullName: 'Amit Patel',
      gender: 'Male',
      phoneNumber: '9876543230',
      email: 'amit.patel@example.in',
      serviceAssigned: 'Veterinary Checkup',
      assigneddate: '2023-09-03',
      timeSlot: '11:00 AM - 01:00 PM',
      status: 'Available',
    },
    {
      caseId: '104',
      fullName: 'Anjali Mehta',
      gender: 'Female',
      phoneNumber: '9876543240',
      email: 'anjali.mehta@example.in',
      serviceAssigned: 'Pet Taxi',
      assigneddate: '2023-09-04',
      timeSlot: '09:00 AM - 10:00 AM',
      status: 'Unavailable',
    },
    {
      caseId: '105',
      fullName: 'Suresh Iyer',
      gender: 'Male',
      phoneNumber: '9876543250',
      email: 'suresh.iyer@example.in',
      serviceAssigned: 'Dog Walking',
      assigneddate: '2023-09-05',
      timeSlot: '03:00 PM - 05:00 PM',
      status: 'Available',
    },
    {
      caseId: '106',
      fullName: 'Deepa Reddy',
      gender: 'Female',
      phoneNumber: '9876543260',
      email: 'deepa.reddy@example.in',
      serviceAssigned: 'Pet Grooming',
      assigneddate: '2023-09-06',
      timeSlot: '12:00 PM - 02:00 PM',
      status: 'Unavailable',
    },
  ];