const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./UserSchema');
const Journal = require('./JournalSchema');
const JournalViewPerms = require('./JournalViewPermsSchema');


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoString = "mongodb+srv://jayp13161:password180@cluster0.jzssdvj.mongodb.net/Project_Journal";
mongoose.connect(mongoString);
const database = mongoose.connection;

app.post('/inviteToJournal', async (req, res) => {
    try {
        const view = new JournalViewPerms(req.body);
        await view.save();
        res.send(view);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getJournalViewers', async (req, res) => {
    try {
        const viewList = await JournalViewPerms.find({});
        res.send(viewList);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/editJournalViewers/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const journalView = await JournalViewPerms.findById(id);
        if (!journalView) {
            return res.status(404).send({ error: "Journal Not Found" });
        }

        journalView.viewers = req.body;
        await journalView.save();
        res.send(journalView);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.post('/createJournal', async (req, res) => {
    try {
        const journal = new Journal(req.body);
        await journal.save();
        console.log(journal);
        res.send(journal);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/editJournal/:id', async (req, res) => {
    const { id } = req.params;
    const { title, text } = req.body;

    try {
        const journal = await Journal.findById(id);
        if (!journal) {
            return res.status(404).send({ error: "Journal Not Found" });
        }

        journal.journalTitle = title;
        journal.journalText = text;

        await journal.save();
        res.send(journal);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get('/getJournals', async (req, res) => {
    try {
        const { title, year, month, day } = req.query;
        let query = {};

        if (title) {
            query.journalTitle = title;
        }

        if (year && month && day) {
            const date = new Date(year, month - 1, day); // months are 0-indexed in JavaScript
            query.journalDate = date;
        }

        const journalList = await Journal.find(query);
        res.send(journalList);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getAllJournals', async (req, res) => {
    try {
        const journalList = await Journal.find({});
        res.send(journalList);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get('/getUsers', async (req, res) => {
    try {
        const userList = await User.find({}, {});
        //console.log(userList);
        // Print each user's details separately
        res.send(userList);
    } catch (error) {
        res.status(500).send(error);
    }
});

// API endpoint to create a new user
app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        console.log(user);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
// API endpoint to get a user by User_id and password
app.get('/getUser', async (req, res) => {
    const { username, password } = req.query;
    try {
        const user = await User.findOne({ username, password });
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Start the server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
// Event listeners for MongoDB connection
database.on('error', (error) => console.log(error));
database.once('connected', () => console.log('Database Connected'));
