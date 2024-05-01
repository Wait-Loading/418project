import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './OnlyViewJournalPage.css';

function OnlyViewJournalPage() {

    const { journal_id } = useParams();
    const [currentJournal, setCurrentJournal] = useState('');

    useEffect(() => {
        async function getJournal() {
            try {
                const journalResponse = await axios.get('http://localhost:9000/getAllJournals');
                const journalList = journalResponse.data;
                const curJournal = [];
                for (const j of journalList) {
                    if (j._id === journal_id) {
                        curJournal.push(j);
                    }
                }
                const jour = curJournal.pop();
                setCurrentJournal(jour);
            } catch (error) {
                alert('error with fetching journals');
            }
        };
        getJournal();
    });

    return (
        <div>
            <h1>Test</h1>
            <h2>{currentJournal.journalTitle}</h2>
            <h3>{currentJournal.journalText}</h3>
        </div>
    );
};

export default OnlyViewJournalPage;