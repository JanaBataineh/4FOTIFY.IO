// src/mockData.js

export const mockOrganizations = [
  { id: 'org1', name: 'TechCorp Inc.', sector: 'Technology' },
  { id: 'org2', name: 'Global Logistics', sector: 'Logistics' }
];

export const mockResponses = [
  { 
    id: 'resp1', 
    orgId: 'org1', 
    userName: 'Sarah Jenkins', 
    date: '2024-06-15',
    scores: { section1: 20, section2: 18, section3: 22, section4: 15 },
    total: 75 
  },
  { 
    id: 'resp2', 
    orgId: 'org1', 
    userName: 'Emma Watson', 
    date: '2024-06-16',
    scores: { section1: 22, section2: 19, section3: 20, section4: 18 },
    total: 79 
  }
];