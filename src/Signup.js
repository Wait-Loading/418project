import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup({ onSignup }) {
  let [username, Set_username] = useState('');
  let [password, set_Password] = useState('');
  let [firstName, Set_First_Name] = useState('');
  let [lastName, Set_Last_Name] = useState('');
  const signupValues = { firstName, lastName, username, password };
  const navigate = useNavigate();

  // Provide a default function for onSignup if it's not provided
  onSignup = onSignup || function() { console.log('onSignup not provided'); };

  const handleSignUp = (event) => {
    event.preventDefault();
    axios.post('http://localhost:9000/createUser', signupValues)
      .then((res) => {
        onSignup();
        alert('Signup Successful');
        navigate('/login');
      })
      .catch((err) => {
        console.error(err);
        alert('Error in Signing Up: ' + err.message);
      });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="text-center">
        <h2>Signup Page</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(e) => Set_First_Name(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => Set_Last_Name(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              value={username}
              onChange={(e) => Set_username(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => set_Password(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    </div>
  );
}

export default Signup;
