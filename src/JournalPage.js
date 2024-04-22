import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './JournalPage.css';
import './Navbar.css';


function JournalPage() {

    const [journalTitle, setJournalTitle] = useState('');
    const [journalText, setJournalText] = useState('');
    const [journalDate, setCurrentDate] = useState('');
    const [creator_id, setUserID] = useState('');
    const navigate = useNavigate();
    const date =  localStorage.getItem('SelectedDate');

    const handleJournalTitle = (event) => {
        setJournalTitle(event.target.value);
    };

    const handleJournalText = (event) => {
        setJournalText(event.target.value);
    };

    const handleCurrentDate = () => {
        const today = new Date();
        setCurrentDate(today);
    };

    const handleUserID = () => {
        const user_id = localStorage.getItem('loggedInUser');
        setUserID(user_id);
    };

    const handleCreateJournal = (event, journalTitle, journalText, creator_id, journalDate) => {
        event.preventDefault();
        axios.post('http://localhost:9000/createJournal', { journalTitle, journalText, creator_id, journalDate })
            .then((res) => alert('Journal Created!'))
            .catch((err) => alert('Error in Creating Journal'));

        setJournalTitle('');
        setJournalText('');
        setUserID('');
        setCurrentDate('');
        navigate('/Home');
    }

    useEffect(() => {
        handleUserID();
        handleCurrentDate();
    });


    return (
        <div>
            <h1>Journal Page</h1>
            <form>
                <section>
                    <label required for="journalTitle">{"Journal Title:"+ date.year}
                        <input type="text" required
                            value={journalTitle}
                            onChange={handleJournalTitle}
                        />
                    </label>
                </section>
                <br />
                <section>
                    <label required for="journalText">
                        <textarea name="jText"
                            value={journalText}
                            onChange={handleJournalText}
                        />
                    </label>
                </section>
            </form>
            <button type="button" onClick={(event) => handleCreateJournal(event, journalTitle, journalText, creator_id, journalDate)}>
                Submit Journal
            </button>
        </div>
    );
};

export default JournalPage;
