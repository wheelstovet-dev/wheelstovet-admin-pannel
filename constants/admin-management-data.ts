// Define the User interface
interface User {
    id: number;
    name: string;
  }
  
  // Define the AdminManagement interface
  export interface AdminManagement {
    [x: string]: any;
    sno: number;
    
    fullName: string;
    gender?: string;
    age?: number,
    dob?: string;
    city?: string;
    state?: string;
    address?: string;
   
    status?: string;
   
    permissions?: string[];
    assignedUsers: User[]; // Array of user objects assigned to the admin
    contactInformation: {
      email: string;
      phone: string;
    };
  }
  
  // Sample data for the AdminManagement system
  export const AdminManagementData: AdminManagement[] = [
    {
      sno: 1,
      fullName: 'Arya Singh',
      status: 'Active',
      city: 'Delhi',
      state: 'Delhi',
      age: 21,
      dob: '24/MAR/2024',
      gender: 'Male',
      address: 'D1 Pro4living elite',
      assignedUsers: [
        { id: 1, name: 'ridhi' },
        { id: 2, name: 'sachin' },
        { id: 3, name: 'kartik' }
      ],
      contactInformation: {
        email: 'ridhi@example.com',
        phone: '123-456-7890'
      }
    },
    {
      sno: 2,
      fullName: 'Kartik Singh',
      status: 'Inactive',
      permissions: ['read'],
      city: 'Delhi',
      gender: 'Female',
      dob: '24/MAR/2024',
      state: 'Delhi',
      age: 21,
      assignedUsers: [
        { id: 4, name: 'Sachin' },
        { id: 5, name: 'Eva ' }
      ],
      contactInformation: {
        email: 'jane.priya@example.com',
        phone: '987-654-3210'
      },
      address: 'Pro2living elite',
    },
    {
      sno: 3,
      fullName: 'Rudra Singh',
      status: 'Active',
      city: 'Delhi',
      state: 'Delhi',
      age: 21,
      dob: '24/MAR/2024',
      gender: 'Male',
      assignedUsers: [
        { id: 6, name: 'Arya' },
        { id: 7, name: 'Deepak' },
        { id: 8, name: 'Sachin' }
      ],
      contactInformation: {
        email: 'ridhi@example.com',
        phone: '555-123-4567'
      },
      address: 'Pro1living elite',
    },
    {
      sno: 4,
      fullName: 'Evaa Singh',
      status: 'Active',
      city: 'Delhi',
      state: 'Delhi',
      age: 21,
      dob: '24/MAR/2024',
      gender: 'Female',
      assignedUsers: [
        { id: 9, name: 'Sachin' },
        { id: 10, name: 'Deepak' }
      ],
      contactInformation: {
        email: 'evaa@example.com',
        phone: '444-555-6666'
      },
      address: 'Pro5living elite',
    }
  ];
  