import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h1>{journal.journalTitle}</h1>
            <p>
                {journal.journalText}
            </p>
        </div>
    );
};

export default ViewJournalPage;