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
              <h1 className="display-4 mb-4">🔬 About CoughTest</h1>
              <p className="lead">
                A medical research platform dedicated to advancing respiratory health 
                through anonymous audio data collection and analysis.
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
              <h2 className="section-title">🎯 Our Mission</h2>
              <p className="section-text">
                CoughTest aims to create the world's largest anonymous database of cough sounds 
                for medical research. By collecting diverse audio samples, we help researchers 
                develop better diagnostic tools and understand respiratory health patterns.
              </p>
              <p className="section-text">
                Every contribution, no matter how small, helps advance medical science and 
                potentially saves lives through improved healthcare technology.
              </p>
            </Col>
            <Col lg={6}>
              <div className="mission-stats">
                <div className="stat-item">
                  <div className="stat-number">🎵</div>
                  <div className="stat-text">High-quality audio samples</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">🔒</div>
                  <div className="stat-text">Complete anonymity guaranteed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">🌍</div>
                  <div className="stat-text">Global research collaboration</div>
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
              <h2 className="section-title">🏥 How Your Contribution Helps</h2>
              <p className="section-subtitle">
                Your anonymous cough recording contributes to multiple areas of medical research
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={4} md={6}>
              <Card className="help-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="help-icon">🤖</div>
                  <Card.Title>AI Diagnostics</Card.Title>
                  <Card.Text>
                    Training machine learning models to detect respiratory conditions 
                    from cough patterns and audio characteristics.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <Card className="help-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="help-icon">📊</div>
                  <Card.Title>Pattern Analysis</Card.Title>
                  <Card.Text>
                    Identifying common patterns in cough sounds that correlate 
                    with different respiratory health conditions.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <Card className="help-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="help-icon">🔬</div>
                  <Card.Title>Medical Research</Card.Title>
                  <Card.Text>
                    Supporting academic research and thesis projects focused on 
                    respiratory health and audio-based diagnostics.
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
              <h2 className="mb-4">Ready to Make a Difference?</h2>
              <p className="lead mb-4">
                Your contribution takes less than a minute but can help advance medical research for years to come.
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