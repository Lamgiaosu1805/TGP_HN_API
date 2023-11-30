const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Profile = new Schema({
    saintName: {
        type: String,
        default: ""
    },
    fullname: {
        type: String,
        default: ""
    },
    dateOfBirth: {
        type: Date,
        default: ""
    },
    address: {
        type: String,
        minlength: 8,
    },
    idAccount: {
        type: String,
        required: true,
    },
    ngayRuaToi: {
        type: Date,
        default: ""
    },
    ngayXungToiLanDau: {
        type: Date,
        default: ""
    },
    ngayThemSuc: {
        type: Date,
        default: ""
    },
    avatarUrl: {
        type: String,
        default: ""
    },
    portraitImg: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', Profile);