       import axios from 'axios';
        import React, { useState } from 'react';

        import { useNavigate } from 'react-router-dom';
        import './Login.css';

 
        function Login({ onLogin }) {
            let [username, Set_username] = useState('');
            let [password, set_Password] = useState('');
            const loginValues = { username, password };
            const navigate = useNavigate();
             // Provide a default function for onLogin if it's not provided

  onLogin = onLogin || function() { console.log('onLogin not provided'); };

            const handleLogin = (event) => {
                event.preventDefault();
                axios.get('http://localhost:9000/getUser', { params: loginValues })
                  .then((res) => {
                    if (res && res.data) {
                      alert('Login Successful');
                      onLogin();
                      localStorage.clear()
                      localStorage.setItem('loggedInUser', res.data.username)
                      navigate('/Home');
                    } else {
                      alert('Wrong Credentials');
                    }
                  })
                   .catch((err) => {
                     console.error(err.response ? err.response.data : err);
                     alert('Error in login');
                  });
              };
            return(
                <div className="Login">
                    <div className="Login_field">
                    <h2 className="header">Login Page</h2>
                    <form onSubmit={handleLogin}>
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
                    <button className="btn btn-secondary mt-3" onClick={() => navigate('/signup')}>Go to Signup</button>
                    </div>
                </div>
            );
        }
        export default Login;
