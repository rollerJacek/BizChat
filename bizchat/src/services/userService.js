import axios from 'axios';
import baseApiURL from '../utils/helpers';

const API_URL = baseApiURL.url + '/api/users';

const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export default { getAllUsers };
