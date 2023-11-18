const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    }
});

const pollSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },  // admin who created the poll
    question: String,
    options: [optionSchema],
    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // just like foreign key
    }]  // [] -> defines array, it means array of users who have voted
});

module.exports = mongoose.model('Poll', pollSchema);