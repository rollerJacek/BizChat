import axios from 'axios';
import baseApiURL from '../utils/helpers';

// Mock data
const mockMessages = [
  {
    id: 1,
    sender_id: 1,
    receiver_id: null,
    chat_type: 'global',
    message: 'Cześć wszystkim! Jak się macie?',
    username: 'admin',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    sender_id: 2,
    receiver_id: null,
    chat_type: 'global',
    message: 'Wszystko dobrze, dzięki! Jak tam projekt?',
    username: 'kierownik1',
    timestamp: '2024-01-15T10:32:00Z'
  },
  {
    id: 3,
    sender_id: 3,
    receiver_id: null,
    chat_type: 'global',
    message: 'Projekt idzie świetnie, skończymy przed terminem.',
    username: 'pracownik1',
    timestamp: '2024-01-15T10:35:00Z'
  },
  {
    id: 4,
    sender_id: 4,
    receiver_id: null,
    chat_type: 'global',
    message: 'Świetnie! To znaczy, że będziemy mogli wziąć kolejny projekt.',
    username: 'sekretariat1',
    timestamp: '2024-01-15T10:37:00Z'
  },
  {
    id: 5,
    sender_id: 5,
    receiver_id: null,
    chat_type: 'global',
    message: 'Dokładnie! Mam już kilka pomysłów na następne zadania.',
    username: 'pracownik2',
    timestamp: '2024-01-15T10:40:00Z'
  }
];

const getMessages = async () => {
  // Mock API call - return mock data
  return mockMessages;
};

const sendMessage = async (receiverId, chatType, message) => {
  // Mock API call - simulate sending message
  const newMessage = {
    id: mockMessages.length + 1,
    sender_id: 1, // Mock current user
    receiver_id: receiverId,
    chat_type: chatType,
    message: message,
    username: 'admin', // Mock current user
    timestamp: new Date().toISOString()
  };
  
  mockMessages.push(newMessage);
  return newMessage;
};

export default { getMessages, sendMessage };
