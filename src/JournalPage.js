import './Navbar.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './JournalPage.css';


function JournalPage() {

    const [journalTitle, setJournalTitle] = useState('');
    const [journalText, setJournalText] = useState('');
    const [creator_id, setUserID] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleJournalTitle = (event) => {
        setJournalTitle(event.target.value);
    };

    const handleJournalText = (event) => {
        setJournalText(event.target.value);
    };

    const handleUserID = () => {
        const user_id = localStorage.getItem('loggedInUser');
        setUserID(user_id);
    };

    const handleDate = () => {
        const today = new Date();
        setDate(today);
    }

    const handleCreateJournal = (event, journalTitle, journalText, creator_id, journalDate) => {
        event.preventDefault();
        axios.post('http://localhost:9000/createJournal', { journalTitle, journalText, creator_id, journalDate })
            .then((res) => alert('Journal Created!'))
            .catch((err) => alert('Error in Creating Journal'));

        setJournalTitle('');
        setJournalText('');
        setUserID('');
        setDate('');
        navigate('/Home');
    }

    useEffect(() => {
        handleUserID();
        handleDate();
    });


    return (
        <div>
            <h1>Journal Page</h1>
            <form>
                <section>
                    <label required for="journalTitle">{"Journal Title:"}
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
            <button type="button" onClick={(event) => handleCreateJournal(event, journalTitle, journalText, creator_id, date)}>
                Submit Journal
            </button>
        </div>
    );
};

export default JournalPage;
