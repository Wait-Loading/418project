import React, { useEffect, useState } from 'react';
import backgroundImage from './R.png'; 
import { useNavigate, Link } from 'react-router-dom';

const HomePage = () => {
  const loggedInUser = localStorage.getItem('loggedInUser')
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState({ day: '', month: '', year: '' });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

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
    function generateCalendar(year, month) {
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
            var btn = document.createElement("button"); // Create a button element
            btn.innerHTML = date; // Set the button text to the date
            btn.classList.add("date-button"); // Add a class for styling
            btn.onclick = function() { 
              setSelectedDate({ day: this.innerHTML, month: month, year: year }); // Update selectedDate state
              localStorage.setItem('SelectedDate', selectedDate);
              navigate('/JournalPage');
            }; // Add an onclick event
            cell.appendChild(btn); // Append the button to the cell
            if (date === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
              cell.classList.add("today");
            }
            date++;
          }
        }
      }
    }

    // Generate calendar for selected year and month
    generateCalendar(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  return (
    <div style={backgroundStyle}>
      <div style={floatingBoxStyle}>
        <div className="welcome-message">
          <h2>Welcome to Our Website</h2>
          <p>Today is <span id="currentDate"></span>.</p>
        </div>

        <div>
          <label>Year: </label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {/* Generate options for years */}
            {[...Array(new Date().getFullYear() - 1970 + 1)].map((_, i) => <option key={i} value={i + 1970}>{i + 1970}</option>)}
          </select>

          <label>Month: </label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {/* Generate options for months */}
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, i) => <option key={i} value={i}>{month}</option>)}
          </select>
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

         { loggedInUser == null &&
            <p className="text-center">
               <button className="btn btn-secondary mt-3" onClick={() => navigate('/signup')}>Go to Signup</button>
              Already have an account? <Link to="/login" className="btn btn-link">Login</Link>
            </p>
          }
      </div>
    </div>
  );
};

export default HomePage;
