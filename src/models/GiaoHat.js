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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('GiaoHat', GiaoHat)