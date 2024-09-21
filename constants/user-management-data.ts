export interface UserManagement {
    userId: string;
    firstName: string;
    lastName: string;
    activityStatus: string;
    address: string;
    city: string;
    state: string;
    reference: string;
    isSubscribed: string; 
    status?: string;
    lastLogin: string;
    email: string;
    phone: string;
  }
  
  export const UserManagementData: UserManagement[] = [
    {
      userId: 'U001',
      firstName: 'Arya',
      lastName: 'Singh',
      activityStatus: 'Active',
      address: 'D1 Pro4living elite',
      city: 'Delhi',
      state: 'Delhi',
      reference: 'Facebook',
      isSubscribed: 'Yes',
      lastLogin: '2004-02-05',
      email: 'ridhi@example.com',
      phone: '7896543734',
    },
    {
      userId: 'U002',
      firstName: 'Kartik',
      lastName: 'Singh',
      activityStatus: 'Inactive',
      address: 'Pro2living elite',
      city: 'Delhi',
      state: 'Delhi',
      reference: 'WhatsApp',
      isSubscribed: 'No',
      lastLogin: '2004-02-05',
      email: 'jane.priya@example.com',
      phone: '7896543734',
    },
    {
      userId: 'U003',
      firstName: 'Rudra',
      lastName: 'Singh',
      activityStatus: 'Active',
      address: 'Pro1living elite',
      city: 'Delhi',
      state: 'Delhi',
      reference: 'Instagram',
      isSubscribed: 'Yes',
      lastLogin: '2004-02-05',
      email: 'rudra@example.com',
      phone: '7896543734',
    },
    {
      userId: 'U004',
      firstName: 'Evaa',
      lastName: 'Singh',
      activityStatus: 'Active',
      address: 'Pro5living elite',
      city: 'Delhi',
      state: 'Delhi',
      reference: 'Facebook',
      isSubscribed: 'Yes',
      lastLogin: '2004-02-05',
      email: 'evaa@example.com',
      phone: '6206530063',
    }
  ];
  