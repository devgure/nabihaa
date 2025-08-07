// mobile/src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Change to https://api.yourdomain.com in prod
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or AsyncStorage
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;