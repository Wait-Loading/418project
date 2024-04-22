// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Navbar'; // Make sure the path to NavBar.js is correct
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import JournalPage from './JournalPage';

const App = () => {
  return (
    <div style={{ marginTop: '3em' }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<JournalPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/JournalPage" element={<JournalPage />} />


      </Routes>
    </div>
  );
};

export default App;
