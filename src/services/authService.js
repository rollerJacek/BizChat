import axios from 'axios';
import baseApiURL from '../utils/helpers';

const API_URL = baseApiURL.url + '/api/auth';

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

const logout = async () => {
  const token = localStorage.getItem('token');
  await axios.post(`${API_URL}/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
};

export default { login, logout };
