import React, { useEffect } from 'react';
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

  useEffect(() => {
    function generateCalendar() {
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = currentDate.getMonth();
      var firstDay = new Date(year, month, 1);
      var lastDay = new Date(year, month + 1, 0);
      var firstDayIndex = firstDay.getDay();
      var lastDate = lastDay.getDate();

      var calendarBody = document.getElementById("calendarBody");
      var date = 1;

      // Clear previous calendar
      calendarBody.innerHTML = "";

      // Create rows and cells for the calendar
      for (var i = 0; i < 6; i++) {
        var row = calendarBody.insertRow();
        for (var j = 0; j < 7; j++) {
          if (i === 0 && j < firstDayIndex) {
            var cell = row.insertCell();
            cell.innerHTML = "";
          } else if (date > lastDate) {
            break;
          } else {
            var cell = row.insertCell();
            cell.innerHTML = date;
            if (date === currentDate.getDate()) {
              cell.classList.add("today");
            }
            date++;
          }
        }
      }
    }

    // Update current date in welcome message
    function updateCurrentDate() {
      var currentDate = new Date();
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById("currentDate").textContent = currentDate.toLocaleDateString('en-US', options);
    }

    // Generate calendar and update current date on page load
    generateCalendar();
    updateCurrentDate();
  }, []);

  return (
    <div style={backgroundStyle}>
            <div style={floatingBoxStyle}>
      <div className="welcome-message">
        <h2>Welcome to Our Website</h2>
        <p>Today is <span id="currentDate"></span>.</p>
      </div>

      <div className="calendar">
        <table>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody id="calendarBody">
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
