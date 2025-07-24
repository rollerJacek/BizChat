import axios from 'axios';
import baseApiURL from '../utils/helpers';

const API_URL = baseApiURL.url + '/api/announcements';

const createAnnouncement = async (message) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, { message }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const getAnnouncements = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export default { createAnnouncement, getAnnouncements };
