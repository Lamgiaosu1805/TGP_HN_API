const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiemDanhTimeSheet = new Schema({
    date: {
        type: String,
        required: true,
    },
    member: {
        type: Object,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DiemDanhTimeSheet', DiemDanhTimeSheet)