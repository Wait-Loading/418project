import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewJournalPage.css'; // Make sure the path to ViewJournalPage.css is correct
import { useNavigate } from 'react-router-dom';

function ViewJournalPage() {

    const navigate = useNavigate();

    const { journal_id } = useParams();
    const [userID, setUserID] = useState('');
    const [journal, setJournal] = useState('');
    const [status, setStatus] = useState(false);
    const [inviteStatus, setInviteStatus] = useState(false);
    const [newText, setText] = useState('');
    const [newTitle, setTitle] = useState('');
    const [users, setUsers] = useState([]);
    const [viewers, setViewers] = useState([]);
    const [viewStatus, setViewStatus] = useState(true);

    const [userOptions, setUserOptions] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        setUserID(user);

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
        setStatus(false);
        setTitle('');
        setText('');
    };

    const showInvite = () => {
        waitForCalls();
        setInviteStatus(true);
    };

    async function waitForCalls() {
        try {
            axios.get('http://localhost:9000/getUsers').then((res) => setUsers(res.data));
            axios.get('http://localhost:9000/getJournalViewers').then((res) => setViewers((res.data).filter(cur => cur.journalID === journal_id)));
        } catch (error) {
            alert('Error with fetching Users');
        }
    };

    const handleInviteList = (addUser) => {
        userOptions.push(addUser);
        setUserOptions(userOptions);
        setUsers(users.filter(user => user._id !== addUser));
    };

    const handleInviteSubmit = (journalID, viewers) => {
        const check = handleViewerList(viewers);
        if (check === null) {
            axios.post('http://localhost:9000/inviteToJournal', { journalID, viewers })
                .then((res) => alert('Journal Shared!'))
                .catch((res) => alert('Error with Sharing Journals'));
            setUserOptions([]);
            navigate('/Home');
        }
    };

    const handleViewerList = (currentList) => {
        if (viewers.length !== 0) {
            const newList = [];
            const viewer = viewers.pop();
            const viewerList = viewer.viewers;
            const viewerID = viewer._id;
            for (const mem of currentList) {
                if (!(viewerList.includes(mem))) {
                    newList.push(mem);
                }
            }
            for (const mem of viewerList) {
                newList.push(mem);
            }

            axios.put(`http://localhost:9000/editJournalViewers/${viewerID}`, newList)
                .then((res) => alert('Journal Shared!'))
                .catch((res) => alert('Error with sharing journal.'));

            navigate('/Home');
            return 1;
        }
        return null;
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
            <br />
            <div>
                <button onClick={showInvite}>Want To Share This Journal?</button>
                <div>
                    {inviteStatus &&
                        <div>
                            <h3>Select Users</h3>
                            <button onClick={(event) => handleInviteSubmit(journal_id, userOptions)}>Ready to Submit?</button>
                            <table>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>User ID</th>
                                        <th>Share</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(users.filter(user => user.username !== userID)).map(user => {
                                        return (
                                            <tr key={user._id}>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.username}</td>
                                                <td>
                                                    <button onClick={(event) => handleInviteList(user._id)}>Add to Share List</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default ViewJournalPage;