/**
 * Application constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// File Upload Configuration
export const FILE_CONFIG = {
  MAX_SIZE: 50 * 1024 * 1024, // 50MB
  ALLOWED_FORMATS: ['wav', 'mp3', 'webm', 'ogg', 'm4a'],
  ALLOWED_MIME_TYPES: [
    'audio/wav', 'audio/wave', 'audio/x-wav',
    'audio/mpeg', 'audio/mp3',
    'audio/webm',
    'audio/ogg',
    'audio/mp4', 'audio/m4a'
  ],
};

// Recording Configuration
export const RECORDING_CONFIG = {
  MAX_DURATION: 10, // seconds
  SAMPLE_RATE: 44100,
  CHANNELS: 1,
  MIME_TYPE: 'audio/webm;codecs=opus',
};

// UI Configuration
export const UI_CONFIG = {
  PAGINATION_SIZE: 20,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  MODAL_ANIMATION_DURATION: 300,
};

// Validation Rules
export const VALIDATION_RULES = {
  ANONYMOUS_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  FILE_TOO_LARGE: `File size exceeds ${FILE_CONFIG.MAX_SIZE / (1024 * 1024)}MB limit.`,
  INVALID_FILE_FORMAT: `Invalid file format. Allowed formats: ${FILE_CONFIG.ALLOWED_FORMATS.join(', ')}`,
  MICROPHONE_ACCESS_DENIED: 'Microphone access denied. Please check your browser permissions.',
  RECORDING_FAILED: 'Recording failed. Please try again.',
  UPLOAD_FAILED: 'Upload failed. Please try again.',
  INVALID_NAME: 'Name must be 2-50 characters and contain only letters, numbers, hyphens, and underscores.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  RECORDING_UPLOADED: 'Recording uploaded successfully!',
  FILE_SELECTED: 'File selected successfully.',
  EXPORT_COMPLETE: 'Export completed successfully.',
};

// Routes
export const ROUTES = {
  HOME: '/',
  RECORD: '/record',
  BROWSE: '/recordings',
  STATISTICS: '/statistics',
  ABOUT: '/about',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
};