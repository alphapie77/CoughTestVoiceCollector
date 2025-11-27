import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navbar = () => {
  return (
    <BootstrapNavbar expand="lg" className="navbar-custom" fixed="top">
      <Container>
        <LinkContainer to="/">
          <BootstrapNavbar.Brand className="fw-bold fs-3">
            🎤 CoughTest
          </BootstrapNavbar.Brand>
        </LinkContainer>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link className="nav-link-custom">🏠 Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/record">
              <Nav.Link className="nav-link-custom">🎙️ Record</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/recordings">
              <Nav.Link className="nav-link-custom">📊 Browse</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/statistics">
              <Nav.Link className="nav-link-custom">📈 Statistics</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link className="nav-link-custom">ℹ️ About</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav>
            <LinkContainer to="/record">
              <Button variant="primary" className="btn-primary-custom">
                🎤 Start Recording
              </Button>
            </LinkContainer>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;