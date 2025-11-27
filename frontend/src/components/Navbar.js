import React, { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
        <BootstrapNavbar.Brand as={Link} to="/" className="brand-advanced">
          <div className="logo-container">
            <div className="logo-icon">🫁</div>
            <div className="logo-text">
              <span className="logo-main">RespiTrack</span>
              <span className="logo-sub">AI Research</span>
            </div>
          </div>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-advanced" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink to="/" className={({ isActive }) => `nav-link-advanced ${isActive ? 'active' : ''}`}>Home</NavLink>
            <NavLink to="/record" className={({ isActive }) => `nav-link-advanced ${isActive ? 'active' : ''}`}>Record</NavLink>
            <NavLink to="/recordings" className={({ isActive }) => `nav-link-advanced ${isActive ? 'active' : ''}`}>Browse</NavLink>
            <NavLink to="/statistics" className={({ isActive }) => `nav-link-advanced ${isActive ? 'active' : ''}`}>Analytics</NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link-advanced ${isActive ? 'active' : ''}`}>About</NavLink>
          </Nav>
          
          <Nav>
            <Button as={Link} to="/record" className="cta-button-nav">
              <span className="cta-icon">🎙️</span>
              <span>Start Recording</span>
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;