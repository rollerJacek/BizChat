import axios from 'axios';
import baseApiURL from '../utils/helpers';

const API_URL = baseApiURL.url + '/api/hr';

const submitRequest = async (type, start_date, end_date) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, { type, start_date, end_date }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const getRequests = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export default { submitRequest, getRequests };
