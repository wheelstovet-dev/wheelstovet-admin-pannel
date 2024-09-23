'use client';

export interface AssignedSubscription {
  caseId: string;
  plan: string;
  frequency: string;
  userFeedback: string;
  assignedDate: string;
  timeSlot: string;
}

export const AssignedSubscriptionData: AssignedSubscription[] = [
  {
    caseId: '101',
    plan: '1 time Dog Walking',
    frequency: 'Daily',
    userFeedback: 'Great service, very punctual!',
    assignedDate: '2023-09-01',
    timeSlot: '10:00 AM',
  },
  {
    caseId: '102',
    plan: '2 Times Dog Walking',
    frequency: 'Weekly',
    userFeedback: 'Good, but the walker arrived late.',
    assignedDate: '2023-09-02',
    timeSlot: '02:00 PM',
  },
  {
    caseId: '103',
    plan: '2 Times Dog Walking',
    frequency: 'Weekly',
    userFeedback: 'The walker was friendly and professional.',
    assignedDate: '2023-09-03',
    timeSlot: '11:00 AM',
  },
  {
    caseId: '104',
    plan: '2 Times Dog Walking',
    frequency: 'Weekly',
    userFeedback: 'Happy with the service, no issues.',
    assignedDate: '2023-09-04',
    timeSlot: '09:00 AM',
  },
  {
    caseId: '105',
    plan: '2 Times Dog Walking',
    frequency: 'Weekly',
    userFeedback: 'The walker forgot to follow specific instructions.',
    assignedDate: '2023-09-05',
    timeSlot: '03:00 PM',
  },
  {
    caseId: '106',
    plan: '2 Times Dog Walking',
    frequency: 'Weekly',
    userFeedback: 'Great service, will book again.',
    assignedDate: '2023-09-06',
    timeSlot: '12:00 PM',
  },
];
