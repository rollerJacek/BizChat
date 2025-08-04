import axios from 'axios';
import baseApiURL from '../utils/helpers';

// Mock data
const mockHrRequests = [
  {
    id: 1,
    user_id: 1,
    username: 'admin',
    type: 'Urlop wypoczynkowy',
    start_date: '2024-01-20T00:00:00Z',
    end_date: '2024-01-25T00:00:00Z',
    status: 'Zatwierdzone',
    created_at: '2024-01-10T10:00:00Z'
  },
  {
    id: 2,
    user_id: 2,
    username: 'kierownik1',
    type: 'Urlop na żądanie',
    start_date: '2024-01-22T00:00:00Z',
    end_date: '2024-01-22T00:00:00Z',
    status: 'Oczekujące',
    created_at: '2024-01-12T14:30:00Z'
  },
  {
    id: 3,
    user_id: 3,
    username: 'pracownik1',
    type: 'Zwolnienie lekarskie',
    start_date: '2024-01-18T00:00:00Z',
    end_date: '2024-01-20T00:00:00Z',
    status: 'Zatwierdzone',
    created_at: '2024-01-15T09:00:00Z'
  }
];

const getHrRequests = async () => {
  // Mock API call - return mock data
  return mockHrRequests;
};

const createHrRequest = async (request) => {
  // Mock API call - simulate creating HR request
  const newRequest = {
    id: mockHrRequests.length + 1,
    ...request,
    created_at: new Date().toISOString()
  };
  
  mockHrRequests.push(newRequest);
  return newRequest;
};

export default { getHrRequests, createHrRequest };
