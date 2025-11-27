import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <BootstrapNavbar expand="lg" className="navbar-custom" fixed="top">
      <Container>
        <LinkContainer to="/">
          <BootstrapNavbar.Brand className="fw-bold">
            🎤 CoughTest
          </BootstrapNavbar.Brand>
        </LinkContainer>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/record">
              <Nav.Link>Record Cough</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/recordings">
              <Nav.Link>View Recordings</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/statistics">
              <Nav.Link>Statistics</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>
                    👋 {user?.username || 'Dashboard'}
                  </Nav.Link>
                </LinkContainer>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={handleLogout}
                  className="ms-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="primary" size="sm" className="ms-2">
                    Sign Up
                  </Button>
                </LinkContainer>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;