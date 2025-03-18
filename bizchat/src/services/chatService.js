import axios from 'axios';
import baseApiURL from '../utils/helpers';

const API_URL = baseApiURL.url + '/api/chat';

const getMessages = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const sendMessage = async (message) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, {  message }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export default { getMessages, sendMessage };
