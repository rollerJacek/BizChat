import axios from 'axios';
import baseApiURL from '../utils/helpers';

// Mock data
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    role: 'admin',
    department_id: 1,
    department_name: 'IT',
    email: 'admin@bizchat.pl'
  },
  {
    id: 2,
    username: 'kierownik1',
    role: 'kierownik',
    department_id: 2,
    department_name: 'HR',
    email: 'kierownik@bizchat.pl'
  },
  {
    id: 3,
    username: 'pracownik1',
    role: 'pracownik',
    department_id: 1,
    department_name: 'IT',
    email: 'pracownik@bizchat.pl'
  },
  {
    id: 4,
    username: 'sekretariat1',
    role: 'sekretariat',
    department_id: 3,
    department_name: 'Administracja',
    email: 'sekretariat@bizchat.pl'
  },
  {
    id: 5,
    username: 'pracownik2',
    role: 'pracownik',
    department_id: 2,
    department_name: 'HR',
    email: 'pracownik2@bizchat.pl'
  }
];

const getAllUsers = async () => {
  // Mock API call - return mock data
  return mockUsers;
};

export default { getAllUsers };
