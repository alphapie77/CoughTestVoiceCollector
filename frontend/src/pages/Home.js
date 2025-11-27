import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
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
      {/* Advanced Hero Section */}
      <section className="hero-advanced">
        <div className="hero-background">
          <div className="hero-particles"></div>
          <div className="hero-gradient"></div>
        </div>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={10}>
              <div className="hero-content-advanced">
                <div className="hero-badge">
                  <span className="badge-icon">🔬</span>
                  <span>Research Data Collection</span>
                </div>
                <h1 className="hero-title-advanced">
                  <span className="title-gradient">RespiTrack</span>
                  <span className="title-subtitle">Respiratory Health Research Platform</span>
                </h1>
                <p className="hero-description-advanced">
                  Contribute to groundbreaking research by sharing your cough audio data. 
                  Help researchers develop better diagnostic tools for respiratory diseases through 
                  anonymous, secure data collection for academic and clinical studies.
                </p>
                <div className="hero-stats-mini">
                  <div className="stat-mini">
                    <span className="stat-number">{stats?.total_recordings || 0}</span>
                    <span className="stat-label">Recordings</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-number">{stats?.total_duration ? Math.round(stats.total_duration / 60) : 0}</span>
                    <span className="stat-label">Minutes</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-number">{(stats?.total_users || 0) + (stats?.total_anonymous || 0)}</span>
                    <span className="stat-label">Contributors</span>
                  </div>
                </div>
                <div className="hero-buttons-advanced">
                  <Button 
                    as={Link} 
                    to="/record" 
                    className="btn-hero-primary"
                  >
                    <span className="btn-icon">🎙️</span>
                    <span>Contribute Data</span>
                    <span className="btn-arrow">→</span>
                  </Button>
                  <Button 
                    as={Link} 
                    to="/about" 
                    className="btn-hero-secondary"
                  >
                    <span className="btn-icon">📊</span>
                    <span>Research Impact</span>
                  </Button>
                </div>
                <div className="hero-features">
                  <div className="feature-item">
                    <span className="feature-icon">🔒</span>
                    <span>Anonymous & Secure</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🔬</span>
                    <span>Scientific Research</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🎓</span>
                    <span>Academic Purpose</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="section-title">Research Impact</h2>
              <p className="section-subtitle">
                Real-time statistics from our growing medical research database
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
              <Col lg={3} md={6}>
                <div className="stats-card">
                  <div className="stats-icon">🎵</div>
                  <div className="stats-number">{stats?.total_recordings || 0}</div>
                  <div className="stats-label">Total Recordings</div>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className="stats-card">
                  <div className="stats-icon">⏱️</div>
                  <div className="stats-number">
                    {stats?.total_duration ? Math.round(stats.total_duration / 60) : 0}
                  </div>
                  <div className="stats-label">Minutes of Audio</div>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className="stats-card">
                  <div className="stats-icon">👥</div>
                  <div className="stats-number">
                    {(stats?.total_users || 0) + (stats?.total_anonymous || 0)}
                  </div>
                  <div className="stats-label">Contributors</div>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className="stats-card">
                  <div className="stats-icon">💾</div>
                  <div className="stats-number">{stats?.total_size_mb?.toFixed(1) || 0}</div>
                  <div className="stats-label">MB of Data</div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">
                Simple, secure, and anonymous contribution to medical research
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={4} md={6}>
              <Card className="feature-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon">🎙️</div>
                  <Card.Title className="feature-title">Record or Upload</Card.Title>
                  <Card.Text className="feature-text">
                    Record your cough directly in the browser for 10 seconds or upload 
                    an existing audio file (WAV, MP3, WebM formats supported).
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <Card className="feature-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon">🔒</div>
                  <Card.Title className="feature-title">Anonymous & Secure</Card.Title>
                  <Card.Text className="feature-text">
                    Your privacy is protected. All submissions are anonymous with 
                    secure storage and no personal information required.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <Card className="feature-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon">🔬</div>
                  <Card.Title className="feature-title">Research Impact</Card.Title>
                  <Card.Text className="feature-text">
                    Contribute to medical research and help develop better 
                    diagnostic tools for respiratory health analysis.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="cta-card">
                <Card.Body className="text-center p-5">
                  <h3 className="cta-title">Ready to Contribute?</h3>
                  <p className="cta-text">
                    Join our research community and help advance medical science. 
                    Your contribution takes less than a minute and helps researchers worldwide.
                  </p>
                  <div className="cta-badges mb-4">
                    <Badge bg="success" className="me-2">✅ Anonymous</Badge>
                    <Badge bg="info" className="me-2">🔒 Secure</Badge>
                    <Badge bg="warning" className="me-2">⚡ Quick</Badge>
                    <Badge bg="primary">🔬 Impactful</Badge>
                  </div>
                  <div className="cta-buttons">
                    <Button 
                      as={Link} 
                      to="/record" 
                      className="btn-primary-custom me-3"
                      size="lg"
                    >
                      🎤 Start Recording Now
                    </Button>
                    <Button 
                      as={Link} 
                      to="/recordings" 
                      variant="outline-primary"
                      size="lg"
                    >
                      📊 Browse Recordings
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;