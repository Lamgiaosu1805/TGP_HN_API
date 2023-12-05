const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberInfo = new Schema({
    fullname: {
        type: String,
        require: true,
    },
    dateOfBirth: {
        type: Date,
        default: null,
    },
    idCapKhan: {
        type: String,
        default: "",
    },
    idXuDoan: {
        type: String,
        default: "",
    },
    idChucVuXuDoan: {
        type: Array,
        default: [],
    },
    avatarUrl: {
        type: String,
        default: "",
    },
    QRCodeUrl: {
        type: String,
        default: "",
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MemberInfo', MemberInfo);