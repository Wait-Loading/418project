const mongoose = require("mongoose");

const JournalViewPermsSchema = new mongoose.Schema({
    journalID: mongoose.Schema.Types.ObjectId,
    viewers: [mongoose.Schema.Types.ObjectId]
});

const JournalViewPerms = mongoose.model("JournalViewPerms", JournalViewPermsSchema);
module.exports = JournalViewPerms;