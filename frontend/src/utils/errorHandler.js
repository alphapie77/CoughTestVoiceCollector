/**
 * Error handling utilities
 */
import { ERROR_MESSAGES } from './constants';

/**
 * Error types
 */
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  FILE: 'FILE_ERROR',
  RECORDING: 'RECORDING_ERROR',
  PERMISSION: 'PERMISSION_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
};

/**
 * Parse API error response
 */
export const parseApiError = (error) => {
  if (!error.response) {
    return {
      type: ERROR_TYPES.NETWORK,
      message: ERROR_MESSAGES.NETWORK_ERROR,
      details: error.message,
    };
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      return {
        type: ERROR_TYPES.VALIDATION,
        message: data.message || 'Validation error',
        details: data.details || data,
      };
    case 413:
      return {
        type: ERROR_TYPES.FILE,
        message: ERROR_MESSAGES.FILE_TOO_LARGE,
        details: 'File size exceeds server limit',
      };
    case 415:
      return {
        type: ERROR_TYPES.FILE,
        message: ERROR_MESSAGES.INVALID_FILE_FORMAT,
        details: 'Unsupported media type',
      };
    case 429:
      return {
        type: ERROR_TYPES.NETWORK,
        message: 'Too many requests. Please try again later.',
        details: 'Rate limit exceeded',
      };
    case 500:
      return {
        type: ERROR_TYPES.UNKNOWN,
        message: 'Server error. Please try again later.',
        details: 'Internal server error',
      };
    default:
      return {
        type: ERROR_TYPES.UNKNOWN,
        message: data.message || 'An unexpected error occurred',
        details: data.details || data,
      };
  }
};

/**
 * Handle recording errors
 */
export const handleRecordingError = (error) => {
  if (error.name === 'NotAllowedError') {
    return {
      type: ERROR_TYPES.PERMISSION,
      message: ERROR_MESSAGES.MICROPHONE_ACCESS_DENIED,
      details: 'User denied microphone access',
    };
  }

  if (error.name === 'NotFoundError') {
    return {
      type: ERROR_TYPES.RECORDING,
      message: 'No microphone found. Please check your device.',
      details: 'No audio input device available',
    };
  }

  if (error.name === 'NotSupportedError') {
    return {
      type: ERROR_TYPES.RECORDING,
      message: 'Recording not supported in this browser.',
      details: 'MediaRecorder API not supported',
    };
  }

  return {
    type: ERROR_TYPES.RECORDING,
    message: ERROR_MESSAGES.RECORDING_FAILED,
    details: error.message,
  };
};

/**
 * Handle file processing errors
 */
export const handleFileError = (error, file) => {
  if (error.message.includes('size')) {
    return {
      type: ERROR_TYPES.FILE,
      message: ERROR_MESSAGES.FILE_TOO_LARGE,
      details: `File: ${file?.name}, Size: ${file?.size} bytes`,
    };
  }

  if (error.message.includes('format') || error.message.includes('type')) {
    return {
      type: ERROR_TYPES.FILE,
      message: ERROR_MESSAGES.INVALID_FILE_FORMAT,
      details: `File: ${file?.name}, Type: ${file?.type}`,
    };
  }

  return {
    type: ERROR_TYPES.FILE,
    message: 'File processing error',
    details: error.message,
  };
};

/**
 * Log error for debugging
 */
export const logError = (error, context = {}) => {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    context,
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  console.error('Application Error:', errorInfo);

  // In production, you might want to send this to an error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to error tracking service
    // errorTrackingService.captureError(errorInfo);
  }
};

/**
 * Create user-friendly error message
 */
export const createErrorMessage = (error, fallbackMessage = 'An error occurred') => {
  if (typeof error === 'string') {
    return error;
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.message) {
    return error.message;
  }

  return fallbackMessage;
};