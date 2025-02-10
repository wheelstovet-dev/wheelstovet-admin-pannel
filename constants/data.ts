import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; 
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; 
  latitude?: number; 
  job: string;
  profile_picture?: string | null; 
};

const handleLogout = () => {
  // Remove authentication tokens or session data
  sessionStorage.removeItem('authToken');
  localStorage.removeItem('authToken');
  
  // Redirect to the login page or home
  window.location.href = '/auth/login';
};


export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Employee Management',
    href: '/employee-management',
    icon: 'user_management',
    label: 'Employee Management'
  },
  {
    title: 'Service Management',
    href: '/service-management',
    icon: 'service_management',
    label: 'Service Management'
  },
  {
    title: 'User Management',
    href: '/user-management',
    icon: 'user_management',
    label: 'User Management'
  },
  {
    title: 'Case Management',
    href: '/case-management',
    icon: 'case_management',
    label: 'Case Management'
  },
  {
    title: 'Coupon/Offers Management',
    href: '/coupons-management',
    icon: 'coupon_management',
    label: 'Coupon Management'
  },
  {
    title: 'Subscription Management',
    href: '/subscription-management',
    icon: 'billing',
    label: 'Subscription Management'
  },
  {
    title: 'Referral Management',
    href: '/referral',
    icon: 'order',
    label: 'create-Referral'
  },
  {
    title: 'Complaint Management',
    href: '/complaint-management',
    icon: 'complaint_management',
    label: 'Complaint Management'
  },
  // {
  //   title: 'Report And Analytics',
  //   href: '/report-management',
  //   icon: 'report',
  //   label: 'create-report',
  //   subItems: [
  //     {
  //       title: 'Account',
  //       href: '/report-management/account',
  //       icon: 'case_management',
  //       label: 'account'
  //     },
  //     {
  //       title: 'Account Statement',
  //       href: '/report-management/account-statement',
  //       icon: 'accountStatement',
  //       label: 'account-statement'
  //     },
  //     {
  //       title: 'Invoice Summary',
  //       href: '/report-management/invoice-summary',
  //       icon: 'invoiceSummary',
  //       label: 'invoice-summary'
  //     },
  //     {
  //       title: 'Service Report',
  //       href: '/report-management/service-report',
  //       icon: 'salesReport',
  //       label: 'sales-report'
  //     },
  //     {
  //       title: 'Bill Summary',
  //       href: '/report-management/bill-summary',
  //       icon: 'billSummary',
  //       label: 'bill-summary'
  //     },
     
  //     {
  //       title: 'Transaction',
  //       href: '/report-management/transaction',
  //       icon: 'transaction',
  //       label: 'transaction'
  //     },
  //     {
  //       title: 'Income Summary',
  //       href: '/report-management/income-summary',
  //       icon: 'incomeSummary',
  //       label: 'income-summary'
  //     },
  //     // {
  //     //   title: 'Expense Summary',
  //     //   href: '/report-management/expense-summary',
  //     //   icon: 'expenseSummary',
  //     //   label: 'expense-summary'
  //     // },
  //     // {
  //     //   title: 'Income vs Expense',
  //     //   href: '/report-management/income-vs-expense',
  //     //   icon: 'incomeVsExpense',
  //     //   label: 'income-vs-expense'
  //     // },
  //     {
  //       title: 'Tax Summary',
  //       href: '/report-management/tax-summary',
  //       icon: 'transaction',
  //       label: 'tax-summary'
  //     }
  //   ]
  // },
  {
    title: 'Settings',
    href: '/settings-management',
    icon: 'settings',
    label: 'settings',
    subItems: [
        {
    title: 'Admin',
    href: '/admin-management',
    icon: 'user',
    label: 'Admin'
  },
      
      // {
      //   title: 'Payment Settings',
      //   href: '/settings-management/payment',
      //   icon: 'paymentSetting',
      //   label: 'payment-settings'
      // },
      {
        title: 'Notification Settings',
        href: '/settings-management/notifications',
        icon: 'notificationSetting',
        label: 'notification-settings'
      },
      
    ]
  },
  {
    title: 'Log Out',
    href: '#', // Prevent navigation, handle logout programmatically
    icon: 'logout',
    label: 'Log Out',
  }
];

