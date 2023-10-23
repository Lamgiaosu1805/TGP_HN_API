const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiaoXu = new Schema({
    name: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: "",
    },
    image: {
        type: Array,
        default: "",
    },
    linkGiaoHat: {
        type: String,
        default: "",
    },
    linkLinhMuc: {
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

module.exports = mongoose.model('GiaoXu', GiaoXu);