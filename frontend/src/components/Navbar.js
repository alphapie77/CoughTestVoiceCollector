import React, { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BootstrapNavbar expand="lg" className={`navbar-advanced ${scrolled ? 'scrolled' : ''}`} fixed="top">
      <Container>
        <LinkContainer to="/">
          <BootstrapNavbar.Brand className="brand-advanced">
            <div className="logo-container">
              <div className="logo-icon">🫁</div>
              <div className="logo-text">
                <span className="logo-main">RespiTrack</span>
                <span className="logo-sub">AI Research</span>
              </div>
            </div>
          </BootstrapNavbar.Brand>
        </LinkContainer>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-advanced" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <LinkContainer to="/">
              <Nav.Link className="nav-link-advanced">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/record">
              <Nav.Link className="nav-link-advanced">Record</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/recordings">
              <Nav.Link className="nav-link-advanced">Browse</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/statistics">
              <Nav.Link className="nav-link-advanced">Analytics</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link className="nav-link-advanced">About</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav>
            <LinkContainer to="/record">
              <Button className="cta-button-nav">
                <span className="cta-icon">🎙️</span>
                <span>Start Recording</span>
              </Button>
            </LinkContainer>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;