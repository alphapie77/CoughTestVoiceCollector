/**
 * Custom hook for audio recording functionality
 */
import { useState, useRef, useCallback, useEffect } from 'react';
import { RECORDING_CONFIG } from '../utils/constants';
import { handleRecordingError, logError } from '../utils/errorHandler';

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  // Check browser support on mount
  useEffect(() => {
    const checkSupport = () => {
      const hasMediaRecorder = typeof MediaRecorder !== 'undefined';
      const hasGetUserMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      setIsSupported(hasMediaRecorder && hasGetUserMedia);
    };

    checkSupport();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    if (!isSupported) {
      const error = new Error('Recording not supported in this browser');
      setError(handleRecordingError(error));
      return false;
    }

    try {
      setError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: RECORDING_CONFIG.SAMPLE_RATE,
          channelCount: RECORDING_CONFIG.CHANNELS,
        }
      });

      streamRef.current = stream;

      const options = { mimeType: RECORDING_CONFIG.MIME_TYPE };

      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        const fallbackTypes = ['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav'];
        for (const type of fallbackTypes) {
          if (MediaRecorder.isTypeSupported(type)) {
            options.mimeType = type;
            break;
          }
        }
      }

      mediaRecorderRef.current = new MediaRecorder(stream, options);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: options.mimeType });
        setRecordedBlob(blob);
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= RECORDING_CONFIG.MAX_DURATION) {
            stopRecording();
            return RECORDING_CONFIG.MAX_DURATION;
          }
          return newTime;
        });
      }, 1000);

      return true;

    } catch (err) {
      const error = handleRecordingError(err);
      setError(error);
      logError(err, { context: 'start_recording' });
      return false;
    }
  }, [isSupported]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    setIsRecording(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetRecording = useCallback(() => {
    stopRecording();
    setRecordedBlob(null);
    setRecordingTime(0);
    setError(null);
    audioChunksRef.current = [];
  }, [stopRecording]);

  return {
    isRecording,
    recordedBlob,
    recordingTime,
    error,
    isSupported,
    startRecording,
    stopRecording,
    resetRecording,
    progress: (recordingTime / RECORDING_CONFIG.MAX_DURATION) * 100,
    remainingTime: RECORDING_CONFIG.MAX_DURATION - recordingTime,
    canRecord: isSupported && !isRecording,
  };
};