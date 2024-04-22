import React from 'react';
import backgroundImage from './R.png'; 
import { useNavigate, Link } from 'react-router-dom';

const HomePage = () => {
  const loggedInUser = localStorage.getItem('loggedInUser')
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'cover',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden' // Prevent scrolling
  };

  const floatingBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center'
  };

  const handleSignOut = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };
   

  return (
    <div style={backgroundStyle}>
      { loggedInUser != null &&
        <div style={floatingBoxStyle}>
          <h1>Welcome to Your Online Journal, {loggedInUser}</h1>
          <p>This is a personal space for you to record your thoughts, ideas, and experiences.</p>
          <p>Created with care by Jay Patel.</p>
          <p>If you have any questions or feedback, feel free to reach out at <strong>jpatel8@albany.edu</strong>.</p>
          <button className="btn btn-secondary mt-3" onClick={handleSignOut}>Sign Out</button>
        </div>
      }
      { loggedInUser == null &&
        <div style={floatingBoxStyle}>
          <p className="text-center">
            <button className="btn btn-secondary mt-3" onClick={() => navigate('/signup')}>Go to Signup</button>
            Already have an account? <Link to="/login" className="btn btn-link">Login</Link>
          </p>
        </div>
      }
    </div>
  );
};

export default HomePage;
