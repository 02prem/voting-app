const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    options: String,
    votes: {
        type: Number,
        default: 0
    }
});

const pollSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },  // user who created the poll
    question: String,
    options: [optionSchema],
    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]  // [] -> defines array, it means array of users who have voted
});

module.exports = mongoose.model('Poll', pollSchema);