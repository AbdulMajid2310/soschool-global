// src/lib/axios.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7002/api',
  withCredentials: true,
});

// 1. Request Interceptor
api.interceptors.request.use((config) => {
  // Ambil sid dari localStorage
  const token = localStorage.getItem('sid');
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 2. Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Cek jika error 401 dan bukan request ke endpoint login/refresh itu sendiri
    if (
      error.response?.status === 401 && 
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !originalRequest.url?.includes('/auth/login')
    ) {
      originalRequest._retry = true;

      try {
        // Gunakan instance axios baru (bukan instance 'api' agar interceptor request tidak ikut campur)
        const res = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`, 
          {}, 
          { withCredentials: true }
        );
        
        const { sid } = res.data.data;
        
        // Update sid di storage
        localStorage.setItem('sid', sid);
        
        // Bersihkan sisa-sisa token lama jika masih ada
        localStorage.removeItem('accessToken');

        // Ulangi request asli dengan token baru
        originalRequest.headers.Authorization = `Bearer ${sid}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Jika refresh token juga gagal/expired, paksa logout
        localStorage.removeItem('sid');
        
        // Cek jika sedang di browser (menghindari error saat SSR)
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);