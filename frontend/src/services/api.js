import axios from 'axios';
import { API_CONFIG, STORAGE_KEYS } from '../utils/constants';
import { parseApiError, logError } from '../utils/errorHandler';
import { retryWithBackoff } from '../utils/helpers';

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token and logging
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request ID for tracking
    config.metadata = { startTime: new Date() };
    
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    logError(error, { context: 'request_interceptor' });
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and logging
api.interceptors.response.use(
  (response) => {
    const duration = new Date() - response.config.metadata?.startTime;
    console.log(`API Response: ${response.status} in ${duration}ms`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Log the error
    const parsedError = parseApiError(error);
    logError(error, { 
      context: 'api_response',
      url: originalRequest?.url,
      method: originalRequest?.method,
      parsedError
    });

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (refreshToken) {
          const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
          
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        window.location.href = '/login';
      }
    }

    return Promise.reject(parsedError);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register/', userData),
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: (refreshToken) => api.post('/auth/logout/', { refresh_token: refreshToken }),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (userData) => api.patch('/auth/profile/', userData),
};

// Enhanced API functions with retry logic
const apiWithRetry = (apiCall) => {
  return retryWithBackoff(apiCall, API_CONFIG.RETRY_ATTEMPTS, API_CONFIG.RETRY_DELAY);
};

// Recordings API
export const recordingsAPI = {
  upload: (formData, onProgress) => {
    return apiWithRetry(() => 
      api.post('/recordings/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress,
      })
    );
  },
  
  bulkUpload: (formData, onProgress) => {
    return apiWithRetry(() => 
      api.post('/recordings/bulk-upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress,
        timeout: 300000, // 5 minutes for bulk uploads
      })
    );
  },
  
  list: (params) => {
    return apiWithRetry(() => api.get('/recordings/list/', { 
      params,
      timeout: 10000 // Faster timeout for list requests
    }));
  },
  
  detail: (recordingId) => {
    return apiWithRetry(() => api.get(`/recordings/detail/${recordingId}/`));
  },
  
  userRecordings: () => {
    return apiWithRetry(() => api.get('/recordings/my-recordings/'));
  },
  
  stats: () => {
    return apiWithRetry(() => api.get('/recordings/stats/'));
  },
  
  delete: (recordingId) => {
    return apiWithRetry(() => api.delete(`/recordings/delete/${recordingId}/`));
  },
  
  exportCSV: () => {
    return apiWithRetry(() => 
      api.get('/recordings/export-csv/', {
        responseType: 'blob',
        timeout: 60000, // 1 minute for large exports
      })
    );
  },
  
  exportHTML: () => {
    return apiWithRetry(() => 
      api.get('/recordings/export-html/', {
        responseType: 'blob',
        timeout: 60000,
      })
    );
  },
  
  exportZIP: () => {
    return apiWithRetry(() => 
      api.get('/recordings/export-zip/', {
        responseType: 'blob',
        timeout: 120000, // 2 minutes for ZIP exports
      })
    );
  },
};

// Health check endpoint
export const healthAPI = {
  check: () => api.get('/health/'),
};

export default api;