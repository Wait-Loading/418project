// NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Navbar.css';
 
const NavBar = () => {
  const loggedInUser = localStorage.getItem('loggedInUser')
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand as={Link} to="/Home">Online Journal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav>
          { loggedInUser && 
            <Nav.Link>Welcome, {loggedInUser}</Nav.Link>
          }
        </Nav>
        { loggedInUser && 
          <Button variant="outline-danger" onClick={handleSignOut} style={{ marginLeft: '10em', padding: '0.1rem 0.2rem' }}>Sign Out</Button>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
