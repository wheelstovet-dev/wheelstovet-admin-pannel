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
    description: 'Delivery was delayed by 2 days.',
    status: 'Open',
    resolution: 'Coupon'
  },
  {
    sno: 2,
    name: "Arya Singh",
    complaintBy: 'Employee',
    description: 'Vegetables were not fresh.',
    status: 'Closed',
    resolution: 'Store credits'
  },
  {
    sno: 3,
    name: "Kartik Singh",
    complaintBy: 'User',
    description: 'Received a fruit basket instead of a veggie bag.',
    status: 'Open',
    resolution: 'Add-on bag'
  },
  {
    sno: 4,
    name: "Shivam Kumar",
    complaintBy: 'Employee',
    description: 'Order was not delivered.',
    status: 'Closed'
  }
];
