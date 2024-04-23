import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Navbar.css';

const NavBar = () => {
  const loggedInUser = localStorage.getItem('loggedInUser')
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/Login');
  };

  // Don't render the Navbar on the login or sign in page
  if (location.pathname === '/Login' || location.pathname === '/Signup' ||  location.pathname === '/') {
    return null;
  }

  return (
    <div className='navbar'>
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand as={Link} to="/Home">Online Journal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav>
          { loggedInUser && 
            <Nav.Link className="font-weight-bold">Welcome, {loggedInUser}</Nav.Link>
          }
        </Nav>
        { loggedInUser && 
          <Nav className="ml-auto">
            <Button variant="outline-danger" onClick={handleSignOut}>Sign Out</Button>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
};

export default NavBar;
