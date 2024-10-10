export interface Enquiry {
    caseId: string;
    userName: string;
    assignedEmployee: string;
    serviceName: string;
    preferredDate: string;
    preferredTime: string;
    email: string;
    phone: string;
    pickupAddress: string;
    updateStatus: string;
  }
  export const EnquiryData: Enquiry[] = [
    {
        caseId: 'c1',
      userName: 'Rajesh Kumar',
      assignedEmployee: 'Amit Sharma',
      serviceName: 'Dog Walking',
      preferredDate: '2024-10-01',
      preferredTime: '08:00 AM - 09:00 AM',
      email: 'rajesh.kumar@example.com',
      phone: '9876543210',
      pickupAddress: '123 Green Street, Delhi',
      updateStatus: 'Pending',
    },
    {
        caseId: 'c1',
      userName: 'Sanya Verma',
      assignedEmployee: 'Priya Patel',
      serviceName: 'Dog Walking',
      preferredDate: '2024-10-02',
      preferredTime: '10:00 AM - 11:00 AM',
      email: 'sanya.verma@example.com',
      phone: '9876543211',
      pickupAddress: '456 Blue Avenue, Mumbai',
      updateStatus: 'Approved',
    },
    {
        caseId: 'c1',
      userName: 'Ravi Nair',
      assignedEmployee: 'Anjali Iyer',
      serviceName: 'Dog Walking',
      preferredDate: '2024-10-03',
      preferredTime: '12:00 PM - 01:00 PM',
      email: 'ravi.nair@example.com',
      phone: '9876543212',
      pickupAddress: '789 Yellow Road, Bangalore',
      updateStatus: 'Rejected',
    },
    {
        caseId: 'c1',
      userName: 'Aisha Khan',
      assignedEmployee: 'Deepak Singh',
      serviceName: 'Dog Walking',
      preferredDate: '2024-10-04',
      preferredTime: '06:00 AM - 07:00 AM',
      email: 'aisha.khan@example.com',
      phone: '9876543213',
      pickupAddress: '321 Orange Boulevard, Hyderabad',
      updateStatus: 'Pending',
    },
    {
        caseId: 'c1',
      userName: 'Vikram Malhotra',
      assignedEmployee: 'Kavita Desai',
      serviceName: 'Dog Walking',
      preferredDate: '2024-10-05',
      preferredTime: '04:00 PM - 05:00 PM',
      email: 'vikram.malhotra@example.com',
      phone: '9876543214',
      pickupAddress: '654 Purple Lane, Chennai',
      updateStatus: 'Approved',
    },
  ];
  
    