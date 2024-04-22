const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./UserSchema');
const Journal = require('./JournalSchema');


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoString = "mongodb+srv://jayp13161:password180@cluster0.jzssdvj.mongodb.net/Project_Journal";
mongoose.connect(mongoString);
const database = mongoose.connection;

app.post('/createJournal', async (req, res) => {
    try {
        const journal = new Journal(req.body);
        await journal.save();
        console.log(journal);
        res.send(journal);
    } catch (error) {
        res.status(500).send(error);
    }
})


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
