const mongoose = require('mongoose');

const Notice = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', Notice);
