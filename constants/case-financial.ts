export interface CaseFinance {
    referenceNo: string;
    date: string;
    time: string;
    paymentMethod: string;
    paymentStatus: string;
    amount: number;
  }
  
 export const CaseFinanceData: CaseFinance[] = [
    {
      referenceNo: 'REF001',
      date: '2024-09-01',
      time: '10:00 AM',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      amount: 1500,
    },
    // {
    //   referenceNo: 'REF002',
    //   date: '2024-09-02',
    //   time: '11:30 AM',
    //   paymentMethod: 'PayPal',
    //   paymentStatus: 'Unpaid',
    //   amount: 2500,
    // },
    // {
    //   referenceNo: 'REF003',
    //   date: '2024-09-03',
    //   time: '1:00 PM',
    //   paymentMethod: 'Bank Transfer',
    //   paymentStatus: 'Paid',
    //   amount: 3500,
    // },
    // {
    //   referenceNo: 'REF004',
    //   date: '2024-09-04',
    //   time: '3:15 PM',
    //   paymentMethod: 'Debit Card',
    //   paymentStatus: 'Paid',
    //   amount: 2000,
    // },
    // {
    //   referenceNo: 'REF005',
    //   date: '2024-09-05',
    //   time: '9:45 AM',
    //   paymentMethod: 'Cash',
    //   paymentStatus: 'Unpaid',
    //   amount: 1800,
    // },
    // {
    //   referenceNo: 'REF006',
    //   date: '2024-09-06',
    //   time: '2:30 PM',
    //   paymentMethod: 'Credit Card',
    //   paymentStatus: 'Paid',
    //   amount: 4000,
    // },
    // {
    //   referenceNo: 'REF007',
    //   date: '2024-09-07',
    //   time: '4:00 PM',
    //   paymentMethod: 'Bank Transfer',
    //   paymentStatus: 'Unpaid',
    //   amount: 1200,
    // },
  ];
  