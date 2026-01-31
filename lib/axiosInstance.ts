// src/lib/axios.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // KONSISTEN: Ambil sid
  const token = localStorage.getItem('sid');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {}, { withCredentials: true });
        
        // KONSISTEN: Terima sid dari backend
        const { sid } = res.data.data;
        
        localStorage.setItem('sid', sid); // Update sid
        localStorage.removeItem('accessToken'); // HAPUS OTOMATIS JIKA ADA SISA LAMA
        
        originalRequest.headers.Authorization = `Bearer ${sid}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem('sid');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);