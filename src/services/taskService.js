import axios from 'axios';
import baseApiURL from '../utils/helpers';

const API_URL = baseApiURL.url +'/api/tasks';

const createTask = async (assigned_to, description, department_id) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, { assigned_to, description, department_id }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const getTasks = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const updateTaskStatus = async (taskId, status) => {
  const token = localStorage.getItem('token');
  await axios.put(`${API_URL}/status`, { taskId, status }, { headers: { Authorization: `Bearer ${token}` } });
};

const addTaskComment = async (taskId, comment) => {
  const token = localStorage.getItem('token');
  await axios.put(`${API_URL}/comment`, { taskId, comment }, { headers: { Authorization: `Bearer ${token}` } });
};

export default { createTask, getTasks, updateTaskStatus, addTaskComment };
