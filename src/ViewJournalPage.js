import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewJournalPage.css'; // Make sure the path to ViewJournalPage.css is correct

function ViewJournalPage() {

    const { journal_id } = useParams();
    const [journal, setJournal] = useState('');
    const [status, setStatus] = useState(false);
    const [newText, setText] = useState('');
    const [newTitle, setTitle] = useState('');

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

    const showEdit = async () => {
        setStatus(true);
        setText(journal.journalText);
        setTitle(journal.journalTitle);
    };

    const handleNewTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleNewText = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (newTitle, newText) => {
        const data = {
            title: newTitle,
            text: newText
        };

        handleRealSubmit(data);
    }

    const handleRealSubmit = (data) => {
        axios.put(`http://localhost:9000/editJournal/${journal_id}`, data)
            .then((res) => alert('Changes Submitted!'))
            .catch((res) => alert('Error with submitting changes.'));
        setStatus(true);
        setTitle('');
        setText('');
    };

    return (
        <div className="journal-page">
            <div>
                <h1 className="journal-title">{journal.journalTitle}</h1>
                <p className="journal-text">
                    {journal.journalText}
                </p>
            </div>
            <div>
                <button onClick={showEdit}>Edit This Journal.</button>
                {status &&
                    <div>
                        <label required for="journalTitle">{"Journal Title:"}
                            <input type="text" required
                                value={newTitle}
                                onChange={handleNewTitle}
                            />
                        </label>
                        <textarea
                            value={newText}
                            onChange={handleNewText}
                        />
                        <button onClick={() => handleSubmit(newTitle, newText)}>Submit Changes</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default ViewJournalPage;
