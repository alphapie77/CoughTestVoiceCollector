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
      {/* Analytics Header */}
      <Row className="mb-5">
        <Col>
          <div className="analytics-header">
            <div className="analytics-hero">
              <div className="analytics-icon">📊</div>
              <h1 className="analytics-title">Research Analytics</h1>
              <p className="analytics-subtitle">
                Real-time insights from our research database
              </p>
            </div>
            <div className="analytics-actions">
              <div className="export-section">
                <h6 className="export-title">📤 Export Data</h6>
                <div className="export-buttons">
                  <button className="export-btn csv" onClick={handleExportCSV}>
                    <span className="export-icon">📊</span>
                    <span className="export-text">CSV</span>
                  </button>
                  <button className="export-btn html" onClick={handleExportHTML}>
                    <span className="export-icon">🎧</span>
                    <span className="export-text">HTML</span>
                  </button>
                  <button className="export-btn zip" onClick={handleExportZIP}>
                    <span className="export-icon">📦</span>
                    <span className="export-text">ZIP</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {message.text && (
        <Alert variant={message.type} className="mb-4">
          {message.text}
        </Alert>
      )}

      {/* Key Metrics */}
      <Row className="g-4 mb-5">
        <Col lg={3} md={6}>
          <div className="metric-card primary">
            <div className="metric-icon">🎵</div>
            <div className="metric-content">
              <div className="metric-number">{stats?.total_recordings || 0}</div>
              <div className="metric-label">Total Recordings</div>
              <div className="metric-trend">+{stats?.total_recordings || 0} samples</div>
            </div>
          </div>
        </Col>
        <Col lg={3} md={6}>
          <div className="metric-card success">
            <div className="metric-icon">👥</div>
            <div className="metric-content">
              <div className="metric-number">{(stats?.total_users || 0) + (stats?.total_anonymous || 0)}</div>
              <div className="metric-label">Contributors</div>
              <div className="metric-trend">{stats?.total_users || 0} registered, {stats?.total_anonymous || 0} anonymous</div>
            </div>
          </div>
        </Col>
        <Col lg={3} md={6}>
          <div className="metric-card warning">
            <div className="metric-icon">⏱️</div>
            <div className="metric-content">
              <div className="metric-number">{stats?.total_duration ? `${(stats.total_duration / 60).toFixed(1)}` : '0'}</div>
              <div className="metric-label">Minutes of Audio</div>
              <div className="metric-trend">Avg: {stats?.avg_duration?.toFixed(1) || 0}s per recording</div>
            </div>
          </div>
        </Col>
        <Col lg={3} md={6}>
          <div className="metric-card info">
            <div className="metric-icon">💾</div>
            <div className="metric-content">
              <div className="metric-number">{stats?.total_size_mb?.toFixed(1) || 0}</div>
              <div className="metric-label">MB of Data</div>
              <div className="metric-trend">Research database size</div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Data Breakdown */}
      <Row className="g-4 mb-5">
        <Col md={6}>
          <div className="breakdown-card">
            <div className="breakdown-header">
              <h4 className="breakdown-title">🎙️ Recording Methods</h4>
              <p className="breakdown-subtitle">How data was collected</p>
            </div>
            <div className="breakdown-content">
              {stats?.recordings_by_method && Object.entries(stats.recordings_by_method).map(([method, count]) => {
                const percentage = ((count / (stats?.total_recordings || 1)) * 100).toFixed(1);
                return (
                  <div key={method} className="breakdown-item">
                    <div className="breakdown-info">
                      <div className="breakdown-method">
                        <span className="method-icon">{method === 'browser' ? '🎙️' : '📁'}</span>
                        <span className="method-name">{method === 'browser' ? 'Browser Recording' : 'File Upload'}</span>
                      </div>
                      <div className="breakdown-stats">
                        <span className="count">{count}</span>
                        <span className="percentage">({percentage}%)</span>
                      </div>
                    </div>
                    <div className="breakdown-bar">
                      <div className="bar-fill" style={{width: `${percentage}%`}}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="breakdown-card">
            <div className="breakdown-header">
              <h4 className="breakdown-title">📁 File Formats</h4>
              <p className="breakdown-subtitle">Audio format distribution</p>
            </div>
            <div className="breakdown-content">
              {stats?.recordings_by_format && Object.entries(stats.recordings_by_format).map(([format, count]) => {
                const percentage = ((count / (stats?.total_recordings || 1)) * 100).toFixed(1);
                return (
                  <div key={format} className="breakdown-item">
                    <div className="breakdown-info">
                      <div className="breakdown-method">
                        <span className="method-icon">🎵</span>
                        <span className="method-name">{format.toUpperCase()} Files</span>
                      </div>
                      <div className="breakdown-stats">
                        <span className="count">{count}</span>
                        <span className="percentage">({percentage}%)</span>
                      </div>
                    </div>
                    <div className="breakdown-bar">
                      <div className="bar-fill format" style={{width: `${percentage}%`}}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>

      {/* Research Impact */}
      <Row>
        <Col>
          <div className="impact-section">
            <div className="impact-header">
              <h3 className="impact-title">🔬 Research Impact</h3>
              <p className="impact-description">
                Your contributions are advancing research and helping develop better analysis tools.
              </p>
            </div>
            <div className="impact-grid">
              <div className="impact-card quality">
                <div className="impact-icon">🎯</div>
                <h5 className="impact-card-title">Data Quality</h5>
                <p className="impact-card-text">High-quality audio samples with comprehensive metadata for accurate analysis</p>
                <div className="impact-metric">{stats?.total_recordings || 0} samples</div>
              </div>
              <div className="impact-card privacy">
                <div className="impact-icon">🔒</div>
                <h5 className="impact-card-title">Privacy Protected</h5>
                <p className="impact-card-text">Anonymous and secure data collection ensuring participant confidentiality</p>
                <div className="impact-metric">{stats?.total_anonymous || 0} anonymous</div>
              </div>
              <div className="impact-card research">
                <div className="impact-icon">📊</div>
                <h5 className="impact-card-title">Research Ready</h5>
                <p className="impact-card-text">Structured data format optimized for machine learning and statistical analysis</p>
                <div className="impact-metric">{stats?.total_size_mb?.toFixed(1) || 0} MB</div>
              </div>
            </div>
          </div>
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