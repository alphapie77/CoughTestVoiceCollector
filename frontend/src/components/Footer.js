import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-research">
      <Container>
        <Row className="py-5">
          <Col lg={4} md={6} className="mb-4">
            <div className="footer-brand">
              <h5>🫁 RespiTrack Research</h5>
              <p className="footer-description">
                Advancing respiratory health research through anonymous audio data collection 
                for academic studies and research purposes.
              </p>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h6 className="footer-title">Research</h6>
            <ul className="footer-links">
              <li><Link to="/record">Contribute Data</Link></li>
              <li><Link to="/recordings">Browse Dataset</Link></li>
              <li><Link to="/statistics">Research Stats</Link></li>
              <li><Link to="/about">Research Impact</Link></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h6 className="footer-title">Data & Privacy</h6>
            <ul className="footer-links">
              <li><span>🔒 Anonymous Collection</span></li>
              <li><span>🏥 Research Use Only</span></li>
              <li><span>🎓 Academic Use</span></li>
              <li><span>📊 Open Research Data</span></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h6 className="footer-title">Research Ethics</h6>
            <div className="research-badges">
              <div className="research-badge">
                <span className="badge-icon">🔬</span>
                <span>IRB Compliant</span>
              </div>
              <div className="research-badge">
                <span className="badge-icon">📋</span>
                <span>Ethical Standards</span>
              </div>
              <div className="research-badge">
                <span className="badge-icon">🛡️</span>
                <span>Data Protection</span>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row className="py-3 border-top">
          <Col md={8}>
            <p className="footer-copyright">
              © 2025 RespiTrack Research Platform. Data collected for research and academic studies. 
              All contributions are anonymous and used exclusively for research purposes.
            </p>
          </Col>
          <Col md={4} className="text-md-end">
            <div className="footer-research-info">
              <span className="research-status">🔬 Active Research Project</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;