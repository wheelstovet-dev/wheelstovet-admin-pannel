// Define the ComplaintManagement interface
export interface ComplaintManagementUser {
  sno: number;
  name: string;
  complaintBy: string;
  description: string;
  status: 'Open' | 'Closed';
  resolution?: string;
}

// Sample data for the complaint management system
export const ComplaintManagementUserData: ComplaintManagementUser[] = [
  {
    sno: 1,
    name: "Deepak Singh",
    complaintBy: 'User',
    description: 'Missing.',
    status: 'Open',
    resolution: 'Coupon'
  },
  {
    sno: 2,
    name: "Arya Singh",
    complaintBy: 'Employee',
    description: 'High salon charge.',
    status: 'Closed',
    resolution: 'Store credits'
  },
  {
    sno: 3,
    name: "Kartik Singh",
    complaintBy: 'User',
    description: 'Late Pickup.',
    status: 'Open',
    resolution: 'Add-on bag'
  },
  {
    sno: 4,
    name: "Shivam Kumar",
    complaintBy: 'Employee',
    description: 'Wrong pickup address.',
    status: 'Closed'
  }
];
