import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div style={{ marginTop: '80px' }}>
      {/* About Hero */}
      <section className="about-hero py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 mb-4">🔬 RespiTrack Research</h1>
              <p className="lead">
                A dedicated research platform for collecting anonymous respiratory 
                audio data to advance diagnostics and academic research.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="section-title">🎯 Research Mission</h2>
              <p className="section-text">
                RespiTrack is building a comprehensive anonymous database of respiratory sounds 
                for research and academic studies. Our platform enables researchers worldwide 
                to access high-quality audio data for developing diagnostic algorithms and 
                understanding respiratory disease patterns.
              </p>
              <p className="section-text">
                This research contributes to thesis projects, peer-reviewed publications, and 
                clinical studies that advance respiratory health and improve patient outcomes 
                through data-driven insights.
              </p>
            </Col>
            <Col lg={6}>
              <div className="mission-stats">
                <div className="stat-item">
                  <div className="stat-number">🎵</div>
                  <div className="stat-text">Research-grade audio data</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">🎓</div>
                  <div className="stat-text">Academic research support</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">📊</div>
                  <div className="stat-text">Data-driven medical insights</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Helps */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="section-title">📊 Research Applications</h2>
              <p className="section-subtitle">
                Your data contribution supports various medical research initiatives and academic studies
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={4} md={6}>
              <Card className="help-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="help-icon">🤖</div>
                  <Card.Title>Diagnostic Research</Card.Title>
                  <Card.Text>
                    Supporting research into automated diagnostic tools and machine learning 
                    algorithms for respiratory condition detection and analysis.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <Card className="help-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="help-icon">📊</div>
                  <Card.Title>Clinical Studies</Card.Title>
                  <Card.Text>
                    Enabling clinical research into respiratory sound patterns and 
                    their correlation with various health conditions and diseases.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <Card className="help-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="help-icon">🔬</div>
                  <Card.Title>Academic Research</Card.Title>
                  <Card.Text>
                    Providing data for thesis projects, dissertations, and peer-reviewed 
                    research publications in respiratory health and medical acoustics.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Privacy Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="privacy-card">
                <Card.Body className="p-5">
                  <h3 className="text-center mb-4">🔐 Privacy & Security</h3>
                  <Row>
                    <Col md={6}>
                      <h5>✅ What We Collect:</h5>
                      <ul>
                        <li>10-second cough audio recordings</li>
                        <li>Audio technical metadata (duration, format)</li>
                        <li>Anonymous timestamp information</li>
                        <li>Recording method (browser/upload)</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <h5>❌ What We DON'T Collect:</h5>
                      <ul>
                        <li>Personal identification information</li>
                        <li>Medical history or health data</li>
                        <li>Location or demographic data</li>
                        <li>Any personally identifiable content</li>
                      </ul>
                    </Col>
                  </Row>
                  <div className="text-center mt-4">
                    <p className="mb-0">
                      <strong>All data is used exclusively for medical research purposes.</strong>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="mb-4">Support Research</h2>
              <p className="lead mb-4">
                Contribute to groundbreaking research with a simple 10-second recording. 
                Your anonymous data helps researchers develop better solutions.
              </p>
              <Button 
                as={Link} 
                to="/record" 
                size="lg" 
                className="btn-primary-custom"
              >
                🎤 Contribute Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;