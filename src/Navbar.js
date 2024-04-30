import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';

const NavBar = () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const userID = localStorage.getItem('UserID');
  const navigate = useNavigate();
  const location = useLocation();
  const [viewList, setViewList] = useState([]);
  const [journalList, setJournalList] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [journalNameList, setJournalNameList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const list = await axios.get('http://localhost:9000/getJournalViewers/');
        setViewList(list.data);
      } catch (error) {
        alert('Error with fetching journals');
      }
    }
    fetchData();
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    if (viewList.length === 0) {
      return;
    }

    const list = [];
    for (const l of viewList) {
      if ((l.viewers).includes(userID)) {
        list.push(l);
      }
    }
    setAccessList(list);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/Login');
  };

  const handleViewPage = (journalPage) => {
    navigate(`/viewjournal/${journalPage.journalID}`);
  }

  // Don't render the Navbar on the login or sign in page
  if (location.pathname === '/Login' || location.pathname === '/Signup' || location.pathname === '/') {
    return null;
  }

  return (
    <div className='navbar'>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Navbar.Brand as={Link} to="/Home">Online Journal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav>
            {loggedInUser &&
              <Nav.Link className="font-weight-bold">Welcome, {loggedInUser}</Nav.Link>
            }
          </Nav>
          {loggedInUser &&
            <Nav className="nav-item dropdown">
              <Button className="dropbtn" onClick={toggleDropdown}>
                View Other's People Journals
              </Button>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  {accessList.map((item, index) => (
                    <li>
                      <button key={index} onClick={() => handleViewPage(item)}>{item.journalID}</button>
                    </li>
                  ))}
                </div>
              )}
            </Nav>
          }
          {loggedInUser &&
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
