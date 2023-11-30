const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CapKhan = new Schema({
    name: {
        type: String,
        default: "",
        unique: true
    },
    detail: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CapKhan', CapKhan)