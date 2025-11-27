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
              <div className="hero-content-focused">
                <h1 className="hero-title-focused">
                  Contribute to Scientific Research
                </h1>
                <p className="hero-subtitle-focused">
                  Your 10-second anonymous cough recording helps researchers develop 
                  AI analysis tools for academic studies and data research.
                </p>
                <div className="hero-cta-focused">
                  <Button 
                    as={Link} 
                    to="/record" 
                    className="btn-cta-focused"
                    size="lg"
                  >
                    🎙️ Record Now - Takes 30 Seconds
                  </Button>
                  <div className="cta-benefits">
                    <span>🔒 100% Anonymous</span>
                    <span>⚡ Quick & Easy</span>
                    <span>📊 Research Impact</span>
                  </div>
                </div>
                <div className="hero-proof">
                  <p className="proof-text">
                    Join <strong>{(stats?.total_users || 0) + (stats?.total_anonymous || 0)} contributors</strong> who have already 
                    submitted <strong>{stats?.total_recordings || 0} recordings</strong> for research purposes
                  </p>
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
                Real-time statistics from our growing research database
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

      {/* How It Works Section */}
      <section className="how-it-works-section py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">
                Three simple steps to contribute to groundbreaking research
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={4} md={6}>
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <div className="step-icon">🎙️</div>
                  <h4 className="step-title">Record Your Cough</h4>
                  <p className="step-text">
                    Click record and cough naturally for 10 seconds. Or upload 
                    an existing audio file if you prefer.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <div className="step-icon">✏️</div>
                  <h4 className="step-title">Add Anonymous Name</h4>
                  <p className="step-text">
                    Choose any name for identification. No personal information 
                    is collected or stored.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <div className="step-icon">🚀</div>
                  <h4 className="step-title">Submit & Impact</h4>
                  <p className="step-text">
                    Your data joins our research database, helping researchers 
                    develop better analysis tools.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="justify-content-center mt-5">
            <Col lg={6} className="text-center">
              <Button 
                as={Link} 
                to="/record" 
                size="lg"
                className="btn-primary-custom"
              >
                🎤 Start Contributing Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Research Impact Section */}
      <section className="research-impact-section py-5 bg-light">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="section-title">Your Impact on Research</h2>
              <p className="section-subtitle">
                See how your contribution helps advance audio analysis research worldwide
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col lg={6}>
              <div className="impact-showcase">
                <div className="impact-visual">
                  <div className="impact-circle">
                    <span className="impact-emoji">🤖</span>
                  </div>
                </div>
                <div className="impact-content">
                  <h4>AI Analysis Development</h4>
                  <p>Your recordings train machine learning models that can analyze audio patterns, enabling better data analysis and research insights.</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="impact-showcase">
                <div className="impact-visual">
                  <div className="impact-circle">
                    <span className="impact-emoji">🏥</span>
                  </div>
                </div>
                <div className="impact-content">
                  <h4>Academic Research Support</h4>
                  <p>Researchers use this data for peer-reviewed studies, thesis projects, and academic research that advance our understanding of audio analysis.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Final CTA Section */}
      <section className="final-cta-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="final-cta-card">
                <div className="cta-content">
                  <h3 className="cta-title">Ready to Make a Difference?</h3>
                  <p className="cta-description">
                    Join {(stats?.total_users || 0) + (stats?.total_anonymous || 0)} contributors who have already helped advance research. 
                    Your 10-second recording contributes to valuable data analysis.
                  </p>
                  <div className="cta-action">
                    <Button 
                      as={Link} 
                      to="/record" 
                      className="btn-cta-primary"
                      size="lg"
                    >
                      <span className="cta-btn-icon">🎙️</span>
                      <span>Contribute Your Voice</span>
                      <span className="cta-btn-arrow">→</span>
                    </Button>
                  </div>
                  <div className="cta-assurance">
                    <span className="assurance-item">🔒 100% Anonymous</span>
                    <span className="assurance-item">⚡ Takes 30 Seconds</span>
                    <span className="assurance-item">📊 Research Impact</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;