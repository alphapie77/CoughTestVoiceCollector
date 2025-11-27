import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Modal } from 'react-bootstrap';
import { recordingsAPI } from '../services/api';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ type: '', title: '', message: '' });

  useEffect(() => {
    fetchStats();
  }, []);

  const showModalDialog = (type, title, message) => {
    setModalConfig({ type, title, message });
    setShowModal(true);
  };

  const fetchStats = async () => {
    try {
      const response = await recordingsAPI.stats();
      setStats(response.data);
    } catch (error) {
      showModalDialog('error', '❌ Error Loading Statistics', 
        'Unable to fetch statistics. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await recordingsAPI.exportCSV();
      
      // Create blob and download
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').split('.')[0];
      link.download = `data_${timestamp}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      showModalDialog('success', '✅ CSV Export Complete', 
        `CSV file has been downloaded successfully!\n\nFile contains ${stats?.total_recordings || 0} recordings with comprehensive metadata for research analysis.`);
    } catch (error) {
      showModalDialog('error', '❌ Export Failed', 
        'Error downloading CSV file. Please try again.');
    }
  };

  const handleExportHTML = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/recordings/export-html/');
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').split('.')[0];
      link.download = `data_${timestamp}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      showModalDialog('success', '✅ HTML Export Complete', 
        `HTML file with embedded audio players has been downloaded!\n\nYou can now open this file in any browser to listen to all ${stats?.total_recordings || 0} recordings with full metadata.`);
    } catch (error) {
      showModalDialog('error', '❌ Export Failed', 
        'Error downloading HTML file. Please try again.');
    }
  };

  const handleExportZIP = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/recordings/export-zip/');
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').split('.')[0];
      link.download = `data_${timestamp}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      showModalDialog('success', '✅ ZIP Export Complete', 
        `Complete ZIP archive has been downloaded!\n\nIncludes:\n• CSV file with all metadata\n• All ${stats?.total_recordings || 0} audio files\n• Total size: ${stats?.total_size_mb?.toFixed(1) || 0} MB\n\nPerfect for offline research analysis.`);
    } catch (error) {
      showModalDialog('error', '❌ Export Failed', 
        'Error downloading ZIP file. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <div className="spinner-border text-primary" />
            <p className="mt-3">Loading statistics...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <Row className="mb-4">
        <Col>
          <Card className="card-custom">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={8}>
                  <h2>📊 Platform Statistics</h2>
                  <p className="text-muted mb-0">
                    Comprehensive analytics of the CoughTest research database
                  </p>
                </Col>
                <Col md={4} className="text-end">
                  <div className="d-flex gap-2 justify-content-end">
                    <Button 
                      variant="outline-primary"
                      onClick={handleExportCSV}
                    >
                      📥 CSV
                    </Button>
                    <Button 
                      variant="outline-success"
                      onClick={handleExportHTML}
                    >
                      🎵 HTML
                    </Button>
                    <Button 
                      variant="outline-warning"
                      onClick={handleExportZIP}
                    >
                      📦 ZIP (CSV + Audio)
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {message.text && (
        <Alert variant={message.type} className="mb-4">
          {message.text}
        </Alert>
      )}

      {/* Main Statistics */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">{stats?.total_recordings || 0}</div>
            <div className="stats-label">Total Recordings</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">{stats?.total_users || 0}</div>
            <div className="stats-label">Registered Users</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">{stats?.total_anonymous || 0}</div>
            <div className="stats-label">Anonymous Users</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">{stats?.total_size_mb?.toFixed(1) || 0}</div>
            <div className="stats-label">Total Size (MB)</div>
          </div>
        </Col>
      </Row>

      {/* Duration Statistics */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <div className="stats-card">
            <div className="stats-number">
              {stats?.total_duration ? `${(stats.total_duration / 60).toFixed(1)}` : '0'}
            </div>
            <div className="stats-label">Total Duration (Minutes)</div>
          </div>
        </Col>
        <Col md={6}>
          <div className="stats-card">
            <div className="stats-number">{stats?.avg_duration?.toFixed(1) || 0}</div>
            <div className="stats-label">Average Duration (Seconds)</div>
          </div>
        </Col>
      </Row>

      {/* Recording Methods */}
      <Row className="mb-4">
        <Col>
          <Card className="card-custom">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">🎙️ Recording Methods</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-4">
                {stats?.recordings_by_method && Object.entries(stats.recordings_by_method).map(([method, count]) => (
                  <Col md={6} key={method}>
                    <div className="text-center">
                      <div className="display-6 text-primary mb-2">
                        {method === 'browser' ? '🎙️' : '📁'}
                      </div>
                      <h4>{count}</h4>
                      <p className="text-muted mb-0">
                        {method === 'browser' ? 'Browser Recordings' : 'File Uploads'}
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* File Formats */}
      <Row className="mb-4">
        <Col>
          <Card className="card-custom">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">📁 File Formats</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-4">
                {stats?.recordings_by_format && Object.entries(stats.recordings_by_format).map(([format, count]) => (
                  <Col md={4} key={format}>
                    <div className="text-center">
                      <div className="display-6 text-success mb-2">🎵</div>
                      <h4>{count}</h4>
                      <p className="text-muted mb-0">
                        {format.toUpperCase()} Files
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Research Impact */}
      <Row>
        <Col>
          <Card className="card-custom">
            <Card.Body className="p-5 text-center">
              <h3 className="mb-3">🔬 Research Impact</h3>
              <p className="text-muted mb-4">
                Your contributions are helping advance medical research in respiratory health analysis. 
                This data will be used for developing better diagnostic tools and understanding cough patterns.
              </p>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="border rounded p-3">
                    <h5 className="text-primary">Data Quality</h5>
                    <p className="small mb-0">High-quality audio samples with comprehensive metadata</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="border rounded p-3">
                    <h5 className="text-success">Privacy Protected</h5>
                    <p className="small mb-0">Anonymous and secure data collection methods</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="border rounded p-3">
                    <h5 className="text-info">Research Ready</h5>
                    <p className="small mb-0">Structured data format suitable for analysis</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modern Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="modern-modal">
        <div className="modal-content-modern">
          <Modal.Body className="p-0">
            <div className="modal-header-modern">
              <div className={`modal-icon-modern ${modalConfig.type}`}>
                {modalConfig.type === 'success' ? '✓' : '✕'}
              </div>
              <h4 className="modal-title-modern">{modalConfig.title}</h4>
              <button className="modal-close-modern" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body-modern">
              <p className="modal-message-modern">{modalConfig.message}</p>
            </div>
            <div className="modal-footer-modern">
              <button 
                className={`btn-modern ${modalConfig.type === 'success' ? 'btn-success-modern' : 'btn-primary-modern'}`}
                onClick={() => setShowModal(false)}
              >
                Got it
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </Container>
  );
};

export default Statistics;