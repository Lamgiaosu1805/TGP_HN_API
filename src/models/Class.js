const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = new Schema({
    name: {
        type: String,
        required: true,
    },
    idCapKhan: {
        type: String,
        required: true,
    },
    idXuDoan: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Class', Class)