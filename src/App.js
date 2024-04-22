// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Navbar'; // Make sure the path to NavBar.js is correct
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import JournalPage from './JournalPage';
import { Link, useNavigate, useLocation } from 'react-router-dom';




const App = () => {
  const location = useLocation();
  return (
    <div style={{ marginTop: '1em' }}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/JournalPage" element={<JournalPage />} />
      </Routes>
    </div>
  );
};

export default App;
