import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, ProgressBar } from 'react-bootstrap';
import { recordingsAPI } from '../services/api';
// No authentication needed for anonymous research

const RecordCough = () => {
  const isAuthenticated = false; // Always anonymous
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadFile, setUploadFile] = useState(null);
  const [anonymousName, setAnonymousName] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [uploading, setUploading] = useState(false);
  const [recordingMethod, setRecordingMethod] = useState('browser');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const MAX_RECORDING_TIME = 10; // 10 seconds

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_RECORDING_TIME - 1) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: 'Error accessing microphone. Please check permissions.' 
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetRecording = () => {
    setRecordedBlob(null);
    setRecordingTime(0);
    setUploadFile(null);
    setMessage({ type: '', text: '' });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/webm'];
      if (!allowedTypes.includes(file.type)) {
        setMessage({ 
          type: 'danger', 
          text: 'Please upload a valid audio file (WAV, MP3, or WebM).' 
        });
        return;
      }

      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setMessage({ 
          type: 'danger', 
          text: 'File size must be less than 50MB.' 
        });
        return;
      }

      setUploadFile(file);
      setRecordedBlob(null);
      setMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async () => {
    if (!recordedBlob && !uploadFile) {
      setMessage({ 
        type: 'warning', 
        text: 'Please record audio or upload a file first.' 
      });
      return;
    }

    if (!anonymousName.trim()) {
      setMessage({ 
        type: 'warning', 
        text: 'Please enter an anonymous name to continue.' 
      });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      
      if (recordedBlob) {
        // Convert webm to wav for better compatibility
        const audioFile = new File([recordedBlob], 'cough_recording.webm', {
          type: 'audio/webm'
        });
        formData.append('audio_file', audioFile);
        formData.append('recording_method', 'browser');
      } else if (uploadFile) {
        formData.append('audio_file', uploadFile);
        formData.append('recording_method', 'upload');
      }

      if (anonymousName.trim()) {
        formData.append('anonymous_name', anonymousName.trim());
      }

      const response = await recordingsAPI.upload(formData);
      
      setMessage({ 
        type: 'success', 
        text: `Recording uploaded successfully! Recording ID: ${response.data.recording_id}` 
      });
      
      // Reset form
      resetRecording();
      setAnonymousName('');
      
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.detail || 'Upload failed. Please try again.' 
      });
    } finally {
      setUploading(false);
    }
  };

  const progressPercentage = (recordingTime / MAX_RECORDING_TIME) * 100;

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="recording-container">
            <Card.Body>
              <div className="text-center mb-4">
                <h2>🎤 Record Your Cough</h2>
                <p className="text-muted">
                  Record for exactly 10 seconds or upload an existing audio file
                </p>
              </div>

              {message.text && (
                <Alert variant={message.type} className="mb-4">
                  {message.text}
                </Alert>
              )}

              {/* Recording Method Selection */}
              <Form.Group className="mb-4">
                <Form.Label>Choose Recording Method:</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    id="browser-record"
                    label="🎙️ Record in Browser"
                    name="recordingMethod"
                    value="browser"
                    checked={recordingMethod === 'browser'}
                    onChange={(e) => setRecordingMethod(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    id="file-upload"
                    label="📁 Upload File"
                    name="recordingMethod"
                    value="upload"
                    checked={recordingMethod === 'upload'}
                    onChange={(e) => setRecordingMethod(e.target.value)}
                  />
                </div>
              </Form.Group>

              {recordingMethod === 'browser' ? (
                /* Browser Recording Section */
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <button
                      className={`recording-button ${isRecording ? 'recording' : 'idle'}`}
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={uploading}
                    >
                      {isRecording ? '⏹️' : '🎙️'}
                    </button>
                  </div>

                  <div className="mb-3">
                    <h5>
                      {isRecording ? 'Recording...' : recordedBlob ? 'Recording Complete!' : 'Ready to Record'}
                    </h5>
                    <p className="text-muted">
                      {isRecording 
                        ? `${recordingTime}/${MAX_RECORDING_TIME} seconds`
                        : recordedBlob 
                        ? 'Click play to review your recording'
                        : 'Click the microphone to start recording'
                      }
                    </p>
                  </div>

                  {isRecording && (
                    <div className="mb-3">
                      <ProgressBar 
                        now={progressPercentage} 
                        className="progress-custom"
                        style={{ height: '8px' }}
                      />
                    </div>
                  )}

                  {recordedBlob && (
                    <div className="mb-3">
                      <audio 
                        ref={audioRef}
                        controls 
                        src={URL.createObjectURL(recordedBlob)}
                        className="audio-player"
                      />
                      <div className="mt-2">
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={resetRecording}
                        >
                          🔄 Record Again
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* File Upload Section */
                <div className="mb-4">
                  <div 
                    className="upload-area"
                    onClick={() => document.getElementById('audioFile').click()}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
                    <h5>Click to Upload Audio File</h5>
                    <p className="text-muted mb-0">
                      Supports WAV, MP3, WebM files (max 50MB)
                    </p>
                  </div>
                  <Form.Control
                    id="audioFile"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  
                  {uploadFile && (
                    <div className="mt-3 text-center">
                      <Alert variant="info">
                        <strong>Selected:</strong> {uploadFile.name} 
                        ({(uploadFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </Alert>
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={() => setUploadFile(null)}
                      >
                        🗑️ Remove File
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Anonymous Name Input */}
              <Form.Group className="mb-4">
                <Form.Label>Anonymous Name (Required)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a unique name for identification"
                    value={anonymousName}
                    onChange={(e) => setAnonymousName(e.target.value)}
                    className="form-control-custom"
                  />
                  <Form.Text className="text-muted">
                    This helps identify your contributions while maintaining anonymity
                  </Form.Text>
                </Form.Group>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  className="btn-primary-custom"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={uploading || (!recordedBlob && !uploadFile)}
                >
                  {uploading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Uploading...
                    </>
                  ) : (
                    '📤 Submit Recording'
                  )}
                </Button>
              </div>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Your recording will be stored securely for research purposes
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecordCough;