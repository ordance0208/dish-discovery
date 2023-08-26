import axios from 'axios';
const restApiBaseUrl = process.env.REACT_APP_REST_API_BASE_URL;

const api = axios.create({
  baseURL: `${restApiBaseUrl}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
