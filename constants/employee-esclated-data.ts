export interface EmplpoyeeEsclated{
    caseId: string;
    userName: string;
    assignedEmployee: string;
    userNote?: string;
    specialInstructions?: string;
  }
export const EmplpoyeeEsclatedData: EmplpoyeeEsclated[] = [
    {
      caseId: 'C1001',
      userName: 'Rajesh Kumar',
      assignedEmployee: 'Amit Sharma',
      userNote: 'My dog, Bruno, is very energetic and pulls on the leash.',
      specialInstructions: 'Avoid dog parks, he tends to be aggressive around other dogs.',
    },
    {
      caseId: 'C1002',
      userName: 'Sanya Verma',
      assignedEmployee: 'Priya Patel',
      userNote: 'Please ensure my dog gets water after the walk.',
      specialInstructions: 'Bella has a history of dehydration, carry a water bottle.',
    },
    {
      caseId: 'C1003',
      userName: 'Ravi Nair',
      assignedEmployee: 'Anjali Iyer',
      userNote: 'Rocky is not friendly with strangers, approach him slowly.',
      specialInstructions: 'Do not take him near crowded places. He barks a lot at unfamiliar people.',
    },
    {
      caseId: 'C1004',
      userName: 'Aisha Khan',
      assignedEmployee: 'Deepak Singh',
      userNote: 'Please take Ginger for a 30-minute run. She has high energy levels.',
      specialInstructions: 'Use the harness instead of the collar, as she tends to choke herself.',
    },
    {
      caseId: 'C1005',
      userName: 'Vikram Malhotra',
      assignedEmployee: 'Kavita Desai',
      userNote: 'Leo has had his rabies shots but can be aggressive if provoked.',
      specialInstructions: 'Keep him on a short leash around other dogs, and avoid off-leash areas.',
    },
  ];
  