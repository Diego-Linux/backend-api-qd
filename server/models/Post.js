const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    views: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('post', postSchema);