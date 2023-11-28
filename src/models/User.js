const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 8,
        unique: true
    },
    mail: {
        type: String,
        // required: true,
        unique: true,
        default: ""
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    isManager: {
        type: Boolean,
        default: false,
    },
    isDelete: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);