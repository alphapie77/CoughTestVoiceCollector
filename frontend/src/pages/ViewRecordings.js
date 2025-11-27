import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Pagination, Modal } from 'react-bootstrap';
import { recordingsAPI } from '../services/api';

const ViewRecordings = () => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    recording_method: '',
    file_format: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ type: '', title: '', message: '' });

  useEffect(() => {
    fetchRecordings();
  }, [currentPage, filters]);

  const showModalDialog = (type, title, message) => {
    setModalConfig({ type, title, message });
    setShowModal(true);
  };

  const fetchRecordings = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '')
        ),
      };
      
      const response = await recordingsAPI.list(params);
      setRecordings(response.data.results || response.data);
      
      if (response.data.count) {
        setTotalPages(Math.ceil(response.data.count / 20));
      }
    } catch (error) {
      showModalDialog('error', '❌ Error Loading Recordings', 
        'Unable to fetch recordings. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      recording_method: '',
      file_format: '',
    });
    setCurrentPage(1);
  };

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <Row className="mb-4">
        <Col>
          <div className="browse-header">
            <h2>🎵 Browse Recordings</h2>
            <p className="mb-0">
              Explore all cough recordings contributed to our research database
            </p>
          </div>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col>
          <div className="browse-filters">
            <h5 className="filter-title">🔍 Filter Recordings</h5>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search by username or filename"
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Recording Method</Form.Label>
                  <Form.Select
                    name="recording_method"
                    value={filters.recording_method}
                    onChange={handleFilterChange}
                    className="form-control-custom"
                  >
                    <option value="">All Methods</option>
                    <option value="browser">Browser Recording</option>
                    <option value="upload">File Upload</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>File Format</Form.Label>
                  <Form.Select
                    name="file_format"
                    value={filters.file_format}
                    onChange={handleFilterChange}
                    className="form-control-custom"
                  >
                    <option value="">All Formats</option>
                    <option value="webm">WebM</option>
                    <option value="wav">WAV</option>
                    <option value="mp3">MP3</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button
                  variant="outline-secondary"
                  onClick={clearFilters}
                  className="w-100"
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Recordings Grid */}
      <Row>
        <Col>
          {loading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} />
              <p className="mt-3">Loading recordings...</p>
            </div>
          ) : recordings.length === 0 ? (
            <div className="text-center p-5">
              <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🎵</div>
              <h5>No recordings found</h5>
              <p className="text-muted mb-0">
                Try adjusting your filters or check back later
              </p>
            </div>
          ) : (
            <div className="recordings-grid">
              {recordings.map((recording) => (
                <div key={recording.recording_id} className="recording-card">
                  <div className="recording-header">
                    <div className="recording-user-info">
                      <div className="recording-user">{recording.user_display_name}</div>
                      <div className="recording-date">{new Date(recording.created_at).toLocaleDateString()}</div>
                    </div>
                    <div className={`recording-method-badge ${
                      recording.recording_method === 'browser' ? 'method-browser' : 'method-upload'
                    }`}>
                      {recording.recording_method === 'browser' ? '🎙️ Browser' : '📁 Upload'}
                    </div>
                  </div>
                  
                  <div className="recording-filename">
                    <span className="filename-label">📄</span>
                    <span className="filename-text">{recording.file_name}</span>
                  </div>
                  
                  <div className="recording-specs">
                    <div className="spec-item">
                      <span className="spec-icon">⏱️</span>
                      <span className="spec-value">{recording.duration ? `${recording.duration.toFixed(1)}s` : 'N/A'}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">💾</span>
                      <span className="spec-value">{recording.file_size_mb} MB</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">🎵</span>
                      <span className="spec-value">{recording.file_format.toUpperCase()}</span>
                    </div>
                  </div>
                  
                  {recording.audio_file_url && (
                    <div className="recording-audio">
                      <div className="audio-label">🎧 Audio Playback</div>
                      <audio controls className="modern-audio-player">
                        <source src={recording.audio_file_url} />
                        Your browser does not support audio playback.
                      </audio>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>

      {/* Modern Pagination */}
      {totalPages > 1 && (
        <Row className="mt-4">
          <Col>
            <div className="pagination-modern">
              <button 
                className="page-btn"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button 
                className="page-btn"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNumber = Math.max(1, currentPage - 2) + index;
                if (pageNumber <= totalPages) {
                  return (
                    <button
                      key={pageNumber}
                      className={`page-btn ${pageNumber === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                return null;
              })}
              
              <button 
                className="page-btn"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              <button 
                className="page-btn"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div>
          </Col>
        </Row>
      )}

      {/* Modern Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="modern-modal">
        <div className="modal-content-modern">
          <Modal.Body className="p-0">
            <div className="modal-header-modern">
              <div className="modal-icon-modern error">
                ✕
              </div>
              <h4 className="modal-title-modern">{modalConfig.title}</h4>
              <button className="modal-close-modern" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body-modern">
              <p className="modal-message-modern">{modalConfig.message}</p>
            </div>
            <div className="modal-footer-modern">
              <button className="btn-modern btn-primary-modern" onClick={() => setShowModal(false)}>
                Got it
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </Container>
  );
};

export default ViewRecordings;