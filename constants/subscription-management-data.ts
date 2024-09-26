import { NavItem } from '@/types';

export interface SubscriptionManagement {
  caseId: string;
  status: string;
  subscriptionId: number;
  userId: number;
  subscriptionPlan: string;
  frequency: string;
  
 
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  paymentStatus?: string; // Example: paid, unpaid, etc.
  subscriptionStatus: 'Active' | 'Inactive'; // Subscription status
}


export const SubscriptionManagementData: SubscriptionManagement[] = [
  {
    caseId: '101',
    status: 'Approve',
    subscriptionId: 1,
    userId: 1,
    subscriptionPlan: 'Daily',
    frequency: '1 Time',
    subscriptionStartDate: '2023-01-01',
    subscriptionEndDate: '2023-12-31',
    subscriptionStatus: 'Active',
    
  },
  {
    caseId: '102',
    status: 'Approve',
    subscriptionId: 2,
    userId: 2,
    subscriptionPlan: 'Weekly',
   
    frequency: '2 Time',
  
    subscriptionStartDate: '2023-02-15',
    subscriptionEndDate: '2023-06-15',
    subscriptionStatus: 'Inactive',
  
  }
];


// export const navItems: NavItem[] = [
//   {
//     title: 'Dashboard',
//     href: '/dashboard',
//     icon: 'dashboard',
//     label: 'Dashboard'
//   },
//   {
//     title: 'User',
//     href: '/user',
//     icon: 'user',
//     label: 'User'
//   },
//   { 
//     title: 'User Management',
//     href: '/user-management',
//     icon: 'management', 
//     label: 'User Management'
//   },
//   {
//     title: 'Profile',
//     href: '/profile',
//     icon: 'profile',
//     label: 'Profile'
//   }
// ];