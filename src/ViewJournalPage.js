import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewJournalPage.css'; // Make sure the path to ViewJournalPage.css is correct

function ViewJournalPage() {

    const { journal_id } = useParams();
    const [journal, setJournal] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const journalResponse = await axios.get('http://localhost:9000/getJournals');
                const journalData = journalResponse.data;
                await journalData.map(async journal => {
                    if (journal._id === journal_id) {
                        setJournal(journal);
                    }
                })
            } catch (error) {
                alert('error with fetching journals');
            }
        }
        fetchData();
    });

    return (
        <div className="journal-page">
            <h1 className="journal-title">{journal.journalTitle}</h1>
            <p className="journal-text">
                {journal.journalText}
            </p>
        </div>
    );
};

export default ViewJournalPage;
