export interface SubscriptionHistory {
    subscriptionId: number;
    date: string;
    timeIn: string;
    timeOut: string;
    duration: string;
    note: string;
    escalate: boolean;
  }
  
  export const SubscriptionHistoryData: SubscriptionHistory[] = [
    {
      subscriptionId: 1,
      date: '2024-09-25',
      timeIn: '09:00 AM',
      timeOut: '05:30 PM',
      duration: '8h 30m',
      note: 'My dog, Bruno, is very energetic and pulls on the leash.',
      escalate: false,
    },
    {
      subscriptionId: 2,
      date: '2024-09-26',
      timeIn: '08:45 AM',
      timeOut: '05:15 PM',
      duration: '8h 30m',
      note: 'Please ensure my dog gets water after the walk.',
      escalate: true,  // Escalation requested due to timing issues for extra walk.
    },
    {
      subscriptionId: 3,
      date: '2024-09-27',
      timeIn: '09:00 AM',
      timeOut: '06:00 PM',
      duration: '9h 00m',
      note: 'Rocky is not friendly with strangers, approach him slowly.',
      escalate: false,
    },
    {
      subscriptionId: 4,
      date: '2024-09-28',
      timeIn: '08:30 AM',
      timeOut: '05:00 PM',
      duration: '8h 30m',
      note: 'Please take Ginger for a 30-minute run. She has high energy levels.',
      escalate: true,
    },
  ];
  