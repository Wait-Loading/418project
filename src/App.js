// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import JournalPage from './JournalPage';
import ViewJournalPage from './ViewJournalPage';
import OnlyViewJournalPage from './OnlyViewJournalPage';
import NavBar from './Navbar'; // Make sure the path to NavBar.js is correct

import { useLocation } from 'react-router-dom';
import './App.css';
const App = () => {
  const location = useLocation();
  const hideOnRoutes = ['/login', '/signup'];

  return (
    <div >
      {!hideOnRoutes.includes(location.pathname) && <NavBar />}
      <div className='App'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/journalpage" element={<JournalPage />} />
          <Route path='/journal/:journal_id' element={<ViewJournalPage />} />
          <Route path='/viewjournal/:journal_id' element={<OnlyViewJournalPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
