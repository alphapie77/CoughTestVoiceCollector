import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div style={{ marginTop: '80px' }}>
      {/* Modern Hero Section */}
      <section className="hero-advanced">
        <div className="hero-background">
          <div className="hero-particles"></div>
          <div className="hero-gradient"></div>
        </div>
        <Container>
          <div className="hero-content-advanced text-center">
            <div className="hero-badge">
              <span className="badge-icon">🔬</span>
              <span>Academic Research Platform</span>
            </div>
            
            <div className="hero-title-advanced">
              <h1 className="title-gradient">RespiTrack</h1>
              <p className="title-subtitle">AI Research Initiative</p>
            </div>
            
            <p className="hero-description-advanced">
              A dedicated research platform for collecting anonymous audio data to advance 
              machine learning analysis and academic research in computational acoustics.
            </p>
            
            <div className="hero-stats-mini">
              <div className="stat-mini">
                <div className="stat-number">🎵</div>
                <div className="stat-label">Research Grade</div>
              </div>
              <div className="stat-mini">
                <div className="stat-number">🔒</div>
                <div className="stat-label">Anonymous</div>
              </div>
              <div className="stat-mini">
                <div className="stat-number">🎓</div>
                <div className="stat-label">Academic</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={6}>
              <h2 className="section-title">🎯 Research Mission</h2>
              <p className="section-text">
                RespiTrack is building a comprehensive anonymous database of cough audio 
                for machine learning research and academic studies. Our platform enables 
                researchers worldwide to access high-quality audio data for developing 
                AI analysis algorithms and understanding respiratory patterns.
              </p>
              <p className="section-text">
                This research contributes to thesis projects, peer-reviewed publications, and 
                academic studies that advance audio analysis and improve healthcare outcomes 
                through data-driven AI insights.
              </p>
            </Col>
            <Col lg={6}>
              <div className="impact-showcase">
                <div className="impact-visual">
                  <div className="impact-circle">
                    <span className="impact-emoji">🤖</span>
                  </div>
                </div>
                <div className="impact-content">
                  <h4>AI-Powered Research</h4>
                  <p>Contributing to the development of machine learning models that can analyze 
                  respiratory patterns and support medical research through anonymous audio data.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Research Applications */}
      <section className="research-impact-section py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="section-title">📊 Research Applications</h2>
              <p className="section-subtitle">
                Your anonymous contributions support cutting-edge research initiatives
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={4} md={6}>
              <div className="impact-showcase">
                <div className="impact-visual">
                  <div className="impact-circle">
                    <span className="impact-emoji">🤖</span>
                  </div>
                </div>
                <div className="impact-content">
                  <h4>Machine Learning</h4>
                  <p>Training AI models for automated respiratory pattern analysis and 
                  audio classification algorithms in medical research.</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="impact-showcase">
                <div className="impact-visual">
                  <div className="impact-circle">
                    <span className="impact-emoji">📊</span>
                  </div>
                </div>
                <div className="impact-content">
                  <h4>Data Science</h4>
                  <p>Enabling research into audio signal processing and statistical 
                  analysis of respiratory sound characteristics.</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div className="impact-showcase">
                <div className="impact-visual">
                  <div className="impact-circle">
                    <span className="impact-emoji">🔬</span>
                  </div>
                </div>
                <div className="impact-content">
                  <h4>Academic Research</h4>
                  <p>Supporting thesis projects, dissertations, and peer-reviewed 
                  publications in computational acoustics and audio analysis.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Privacy Section */}
      <section className="impact-section py-5">
        <Container>
          <div className="impact-header text-center mb-5">
            <h2 className="impact-title">🔐 Privacy & Security</h2>
            <p className="impact-description">
              Your privacy is our priority. We maintain the highest standards of data protection.
            </p>
          </div>
          
          <div className="impact-grid">
            <div className="impact-card privacy">
              <div className="impact-icon">✅</div>
              <h3 className="impact-card-title">What We Collect</h3>
              <div className="impact-card-text">
                <ul style={{textAlign: 'left', paddingLeft: '1.5rem'}}>
                  <li>10-second cough audio recordings</li>
                  <li>Audio technical metadata (duration, format)</li>
                  <li>Anonymous timestamp information</li>
                  <li>Recording method (browser/upload)</li>
                </ul>
              </div>
            </div>
            
            <div className="impact-card quality">
              <div className="impact-icon">❌</div>
              <h3 className="impact-card-title">What We DON'T Collect</h3>
              <div className="impact-card-text">
                <ul style={{textAlign: 'left', paddingLeft: '1.5rem'}}>
                  <li>Personal identification information</li>
                  <li>Medical history or health data</li>
                  <li>Location or demographic data</li>
                  <li>Any personally identifiable content</li>
                </ul>
              </div>
            </div>
            
            <div className="impact-card research">
              <div className="impact-icon">🔒</div>
              <h3 className="impact-card-title">Data Protection</h3>
              <div className="impact-card-text">
                All data is anonymized, encrypted, and used exclusively for academic research purposes. 
                We follow strict ethical guidelines and data protection regulations.
              </div>
              <div className="impact-metric">100% Anonymous</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section py-5">
        <Container>
          <div className="final-cta-card">
            <h2 className="cta-title">Support AI Research</h2>
            <p className="cta-description">
              Contribute to groundbreaking machine learning research with a simple 10-second recording. 
              Your anonymous data helps researchers develop better AI solutions for healthcare.
            </p>
            
            <Button 
              as={Link} 
              to="/record" 
              className="btn-cta-primary pulse-animation"
            >
              <span className="cta-btn-icon">🎤</span>
              <span>Contribute Now</span>
              <span className="cta-btn-arrow">→</span>
            </Button>
            
            <div className="cta-assurance">
              <div className="assurance-item">
                <span>🔒</span>
                <span>100% Anonymous</span>
              </div>
              <div className="assurance-item">
                <span>⚡</span>
                <span>10 Seconds Only</span>
              </div>
              <div className="assurance-item">
                <span>🎓</span>
                <span>Academic Research</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;