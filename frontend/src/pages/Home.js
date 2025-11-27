import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { recordingsAPI } from '../services/api';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

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

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h1>🎤 CoughTest Research Platform</h1>
              <p className="lead">
                Contribute to medical research by recording your cough sounds. 
                Help us build a comprehensive database for healthcare analysis.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Button 
                  as={Link} 
                  to="/record" 
                  size="lg" 
                  className="btn-primary-custom"
                >
                  🎙️ Record Your Cough
                </Button>
                <Button 
                  as={Link} 
                  to="/recordings" 
                  variant="outline-light" 
                  size="lg"
                >
                  📊 View All Recordings
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Statistics Section */}
      <Container className="py-5">
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className="mb-4">Platform Statistics</h2>
            <p className="text-muted">
              Real-time data from our growing research database
            </p>
          </Col>
        </Row>

        {loading ? (
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="g-4">
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
                <div className="stats-label">Anonymous Submissions</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stats-card">
                <div className="stats-number">{stats?.total_size_mb?.toFixed(1) || 0}</div>
                <div className="stats-label">Total Data (MB)</div>
              </div>
            </Col>
          </Row>
        )}
      </Container>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className="mb-4">How It Works</h2>
            <p className="text-muted">
              Simple steps to contribute to medical research
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={4}>
            <Card className="card-custom h-100 text-center">
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem' }}>🎙️</div>
                <Card.Title>Record or Upload</Card.Title>
                <Card.Text>
                  Record your cough directly in the browser for 10 seconds or upload 
                  an existing audio file (WAV/MP3 format).
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="card-custom h-100 text-center">
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem' }}>💾</div>
                <Card.Title>Secure Storage</Card.Title>
                <Card.Text>
                  Your audio data is securely stored with comprehensive metadata 
                  for research purposes while maintaining privacy.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="card-custom h-100 text-center">
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem' }}>📊</div>
                <Card.Title>Research Impact</Card.Title>
                <Card.Text>
                  Contribute to medical research and help develop better 
                  diagnostic tools for respiratory health analysis.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="card-custom text-center">
              <Card.Body className="p-5">
                <h3 className="mb-3">Ready to Contribute?</h3>
                <p className="text-muted mb-4">
                  Join our research community and help advance medical science. 
                  You can participate anonymously or create an account to track your contributions.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Button 
                    as={Link} 
                    to="/record" 
                    className="btn-primary-custom"
                    size="lg"
                  >
                    Start Recording Now
                  </Button>
                  <Button 
                    as={Link} 
                    to="/register" 
                    variant="outline-primary"
                    size="lg"
                  >
                    Create Account
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;