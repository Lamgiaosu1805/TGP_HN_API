const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiaoHat = new Schema({
    name: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    detail: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('GiaoHat', GiaoHat)