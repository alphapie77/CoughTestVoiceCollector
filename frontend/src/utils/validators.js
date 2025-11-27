/**
 * Client-side validation utilities
 */
import { FILE_CONFIG, VALIDATION_RULES, ERROR_MESSAGES } from './constants';

/**
 * Validate audio file
 */
export const validateAudioFile = (file) => {
  const errors = [];

  if (!file) {
    errors.push('No file selected');
    return errors;
  }

  // Check file size
  if (file.size > FILE_CONFIG.MAX_SIZE) {
    errors.push(ERROR_MESSAGES.FILE_TOO_LARGE);
  }

  // Check file extension
  const extension = file.name.split('.').pop().toLowerCase();
  if (!FILE_CONFIG.ALLOWED_FORMATS.includes(extension)) {
    errors.push(ERROR_MESSAGES.INVALID_FILE_FORMAT);
  }

  // Check MIME type
  if (file.type && !FILE_CONFIG.ALLOWED_MIME_TYPES.includes(file.type)) {
    errors.push(`Invalid MIME type: ${file.type}`);
  }

  return errors;
};

/**
 * Validate anonymous name
 */
export const validateAnonymousName = (name) => {
  const errors = [];

  if (!name || !name.trim()) {
    errors.push('Name is required');
    return errors;
  }

  const trimmedName = name.trim();

  if (trimmedName.length < VALIDATION_RULES.ANONYMOUS_NAME.MIN_LENGTH) {
    errors.push(`Name must be at least ${VALIDATION_RULES.ANONYMOUS_NAME.MIN_LENGTH} characters`);
  }

  if (trimmedName.length > VALIDATION_RULES.ANONYMOUS_NAME.MAX_LENGTH) {
    errors.push(`Name must be less than ${VALIDATION_RULES.ANONYMOUS_NAME.MAX_LENGTH} characters`);
  }

  if (!VALIDATION_RULES.ANONYMOUS_NAME.PATTERN.test(trimmedName)) {
    errors.push(ERROR_MESSAGES.INVALID_NAME);
  }

  return errors;
};

/**
 * Validate recording method
 */
export const validateRecordingMethod = (method) => {
  const validMethods = ['browser', 'upload'];
  if (!validMethods.includes(method)) {
    return [`Invalid recording method. Must be one of: ${validMethods.join(', ')}`];
  }
  return [];
};

/**
 * Validate form data before submission
 */
export const validateSubmissionData = (data) => {
  const errors = {};

  // Validate audio file or recorded blob
  if (!data.recordedBlob && !data.uploadFile) {
    errors.audio = ['Please record audio or upload a file'];
  } else if (data.uploadFile) {
    const fileErrors = validateAudioFile(data.uploadFile);
    if (fileErrors.length > 0) {
      errors.audio = fileErrors;
    }
  }

  // Validate anonymous name
  if (data.anonymousName) {
    const nameErrors = validateAnonymousName(data.anonymousName);
    if (nameErrors.length > 0) {
      errors.name = nameErrors;
    }
  } else {
    errors.name = ['Name is required'];
  }

  // Validate recording method
  if (data.recordingMethod) {
    const methodErrors = validateRecordingMethod(data.recordingMethod);
    if (methodErrors.length > 0) {
      errors.method = methodErrors;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};