import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { recordingsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Statistics = () => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await recordingsAPI.stats();
      setStats(response.data);
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: 'Error fetching statistics' 
      });
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
      link.download = `cough_recordings_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setMessage({ 
        type: 'success', 
        text: 'CSV file downloaded successfully!' 
      });
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: 'Error downloading CSV. Admin access required.' 
      });
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
                  {isAuthenticated && (
                    <Button 
                      variant="outline-primary"
                      onClick={handleExportCSV}
                    >
                      📥 Export CSV
                    </Button>
                  )}
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
    </Container>
  );
};

export default Statistics;