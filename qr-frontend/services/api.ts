import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api', // Fallback added
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    // Global Error Handling
    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized - redirect to login
      if (status === 401 && typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login?expired=true';
      }

      // Propagate error to ToastProvider via CustomEvent
      if (typeof window !== 'undefined') {
        const message = data.message || 'Something went wrong';
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message, type: 'error' } }));
      }

      console.error('API Error:', data);
    }
    return Promise.reject(error);
  }
);

export default api;