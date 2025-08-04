import axios from 'axios';
import baseApiURL from '../utils/helpers';

// Mock data
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    email: 'admin@bizchat.pl'
  },
  {
    id: 2,
    username: 'kierownik1',
    password: 'kierownik123',
    role: 'kierownik',
    email: 'kierownik@bizchat.pl'
  },
  {
    id: 3,
    username: 'pracownik1',
    password: 'pracownik123',
    role: 'pracownik',
    email: 'pracownik@bizchat.pl'
  }
];

const login = async (username, password) => {
  // Mock login - check against mock data
  const user = mockUsers.find(u => u.username === username && u.password === password);
  
  if (user) {
    const token = `mock-token-${user.id}`;
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email
      }
    };
  } else {
    throw new Error('Nieprawidłowe dane logowania');
  }
};

const logout = async () => {
  // Mock logout - just return success
  return { success: true };
};

export default { login, logout };
