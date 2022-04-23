const mongoose = require('mongoose');

const historyPostSchema = new mongoose.Schema({
    originalPost: {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('historyPost', historyPostSchema);