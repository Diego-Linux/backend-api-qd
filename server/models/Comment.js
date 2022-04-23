const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    content: {
        type: String,
        required: true
    },
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
}, {
    timestamps: true
})

module.exports = mongoose.model('comment', commentSchema)