const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
    journalTitle: String,
    journalText: String,
    creator_id: String,
    journalDate: Date
});

const Journal = mongoose.model("Journal", JournalSchema);

module.exports = Journal;