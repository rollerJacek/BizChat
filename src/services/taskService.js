import axios from 'axios';
import baseApiURL from '../utils/helpers';

// Mock data
const mockTasks = [
  {
    id: 1,
    title: 'Implementacja nowej funkcjonalności',
    description: 'Dodanie nowego modułu do systemu zarządzania zadaniami',
    status: 'W trakcie',
    priority: 'Wysoki',
    assignee_id: 1,
    assignee_name: 'admin',
    due_date: '2024-01-25T00:00:00Z',
    created_at: '2024-01-10T09:00:00Z'
  },
  {
    id: 2,
    title: 'Testowanie aplikacji',
    description: 'Przeprowadzenie testów jednostkowych i integracyjnych',
    status: 'Do zrobienia',
    priority: 'Średni',
    assignee_id: 2,
    assignee_name: 'kierownik1',
    due_date: '2024-01-30T00:00:00Z',
    created_at: '2024-01-12T14:00:00Z'
  },
  {
    id: 3,
    title: 'Dokumentacja API',
    description: 'Przygotowanie dokumentacji technicznej dla API',
    status: 'Zakończone',
    priority: 'Niski',
    assignee_id: 3,
    assignee_name: 'pracownik1',
    due_date: '2024-01-20T00:00:00Z',
    created_at: '2024-01-08T11:00:00Z'
  },
  {
    id: 4,
    title: 'Optymalizacja bazy danych',
    description: 'Przeprowadzenie optymalizacji zapytań SQL',
    status: 'W trakcie',
    priority: 'Wysoki',
    assignee_id: 4,
    assignee_name: 'sekretariat1',
    due_date: '2024-01-28T00:00:00Z',
    created_at: '2024-01-14T16:00:00Z'
  }
];

const getTasks = async () => {
  // Mock API call - return mock data
  return mockTasks;
};

const createTask = async (task) => {
  // Mock API call - simulate creating task
  const newTask = {
    id: mockTasks.length + 1,
    ...task,
    created_at: new Date().toISOString()
  };
  
  mockTasks.push(newTask);
  return newTask;
};

const updateTask = async (id, updates) => {
  // Mock API call - simulate updating task
  const taskIndex = mockTasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates };
    return mockTasks[taskIndex];
  }
  throw new Error('Task not found');
};

const deleteTask = async (id) => {
  // Mock API call - simulate deleting task
  const taskIndex = mockTasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    const deletedTask = mockTasks.splice(taskIndex, 1)[0];
    return deletedTask;
  }
  throw new Error('Task not found');
};

export default { getTasks, createTask, updateTask, deleteTask };
