const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentLikeSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Comment',
        index: true
    },
    
}, { timestamps: true })

const CommentLike = mongoose.model('CommentLike', commentLikeSchema)

module.exports = CommentLike