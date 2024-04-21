import React, { useState } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import LoginPage from './Login';
import SignupPage from './Signup';
//import Home from './Home'; // Assuming Home is in the same directory
import './App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignup = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      
      <div className="content">
        
      </div>
    </div>
  );
}

export default App;
