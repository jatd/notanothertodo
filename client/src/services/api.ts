import axios from 'axios';

export default () => {
  const token = sessionStorage.getItem('token');
  const header = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  return axios.create({
    baseURL: 'http://localhost:3000',
    ...header,
  });
};
