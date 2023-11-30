const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const XuDoan = new Schema({
    name: {
        type: String,
        unique: true,
        require: true,
    },
    idHiepDoan: {
        type: String,
        default: "",
        require: true
    },
    idAccount: {
        type: String,
        default: "",
        require: true
    },
    detail: {
        type: Array,
        default: [],
    },
    ngayThanhLap: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('XuDoan', XuDoan)