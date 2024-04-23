// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Navbar'; // Make sure the path to NavBar.js is correct
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import JournalPage from './JournalPage';
import ViewJournalPage from './ViewJournalPage';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const hideOnRoutes = ['/login', '/signup'];

  return (
    <div style={{ marginTop: '5em' }}>
      {!hideOnRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/journalpage" element={<JournalPage />} />
        <Route path='/journal/:journal_id' element={<ViewJournalPage />} />
      </Routes>
    </div>
  );
};

export default App;
