import axios from 'axios';
const DEV_REST_API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: `${DEV_REST_API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
