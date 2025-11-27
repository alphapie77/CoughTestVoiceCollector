import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { recordingsAPI } from '../services/api';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserRecordings();
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchUserRecordings = async () => {
    try {
      const response = await recordingsAPI.userRecordings();
      setRecordings(response.data.results || response.data);
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: 'Error fetching recordings' 
      });
    }
  };

  const fetchStats = async () => {
    try {
      const response = await recordingsAPI.stats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recordingId) => {
    if (window.confirm('Are you sure you want to delete this recording?')) {
      try {
        await recordingsAPI.delete(recordingId);
        setMessage({ 
          type: 'success', 
          text: 'Recording deleted successfully' 
        });
        fetchUserRecordings();
      } catch (error) {
        setMessage({ 
          type: 'danger', 
          text: 'Error deleting recording' 
        });
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Card className="card-custom">
              <Card.Body className="p-5">
                <h3>🔐 Login Required</h3>
                <p className="text-muted mb-4">
                  Please login to access your dashboard
                </p>
                <Button as={Link} to="/login" className="btn-primary-custom">
                  Login Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <Card className="card-custom">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={8}>
                  <h2>👋 Welcome back, {user?.first_name || user?.username}!</h2>
                  <p className="text-muted mb-0">
                    Manage your cough recordings and track your contributions
                  </p>
                </Col>
                <Col md={4} className="text-end">
                  <Button 
                    as={Link} 
                    to="/record" 
                    className="btn-primary-custom"
                  >
                    🎙️ New Recording
                  </Button>
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

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">{recordings.length}</div>
            <div className="stats-label">Your Recordings</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">
              {recordings.reduce((sum, r) => sum + (r.duration || 0), 0).toFixed(1)}s
            </div>
            <div className="stats-label">Total Duration</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">
              {recordings.reduce((sum, r) => sum + (r.file_size_mb || 0), 0).toFixed(1)}
            </div>
            <div className="stats-label">Total Size (MB)</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stats-card">
            <div className="stats-number">{stats?.total_recordings || 0}</div>
            <div className="stats-label">Platform Total</div>
          </div>
        </Col>
      </Row>

      {/* Recordings Table */}
      <Row>
        <Col>
          <Card className="card-custom">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">📊 Your Recordings</h5>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" />
                </div>
              ) : recordings.length === 0 ? (
                <div className="text-center p-5">
                  <h5>No recordings yet</h5>
                  <p className="text-muted mb-3">
                    Start contributing to research by recording your first cough
                  </p>
                  <Button as={Link} to="/record" className="btn-primary-custom">
                    🎙️ Record Now
                  </Button>
                </div>
              ) : (
                <Table responsive className="mb-0">
                  <thead className="table-primary">
                    <tr>
                      <th>File Name</th>
                      <th>Duration</th>
                      <th>Size</th>
                      <th>Method</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recordings.map((recording) => (
                      <tr key={recording.recording_id}>
                        <td>{recording.file_name}</td>
                        <td>
                          {recording.duration ? `${recording.duration.toFixed(1)}s` : 'N/A'}
                        </td>
                        <td>{recording.file_size_mb} MB</td>
                        <td>
                          <span className={`badge ${
                            recording.recording_method === 'browser' 
                              ? 'bg-success' 
                              : 'bg-info'
                          }`}>
                            {recording.recording_method === 'browser' ? '🎙️ Browser' : '📁 Upload'}
                          </span>
                        </td>
                        <td>
                          {new Date(recording.created_at).toLocaleDateString()}
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(recording.recording_id)}
                          >
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;