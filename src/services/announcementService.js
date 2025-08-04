import axios from 'axios';
import baseApiURL from '../utils/helpers';

// Mock data
const mockAnnouncements = [
  {
    id: 1,
    title: 'Nowa polityka pracy zdalnej',
    content: 'Od przyszłego tygodnia wprowadzamy nowe zasady pracy zdalnej. Wszyscy pracownicy będą mogli pracować z domu 2 dni w tygodniu.',
    author: 'HR',
    created_at: '2024-01-15T09:00:00Z'
  },
  {
    id: 2,
    title: 'Aktualizacja systemu',
    content: 'W weekend planowana jest aktualizacja systemu. Prosimy o zapisanie wszystkich ważnych danych.',
    author: 'IT',
    created_at: '2024-01-14T14:30:00Z'
  },
  {
    id: 3,
    title: 'Spotkanie zespołu',
    content: 'W piątek o 10:00 odbędzie się spotkanie całego zespołu. Obecność obowiązkowa.',
    author: 'Kierownik',
    created_at: '2024-01-13T16:00:00Z'
  }
];

const getAnnouncements = async () => {
  // Mock API call - return mock data
  return mockAnnouncements;
};

const createAnnouncement = async (announcement) => {
  // Mock API call - simulate creating announcement
  const newAnnouncement = {
    id: mockAnnouncements.length + 1,
    ...announcement,
    created_at: new Date().toISOString()
  };
  
  mockAnnouncements.push(newAnnouncement);
  return newAnnouncement;
};

export default { getAnnouncements, createAnnouncement };
