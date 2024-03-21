const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    creator_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
        index: true
    },
    likes: {
        type: Number,
        default: 0,
    },
    replies: {
        type: Number,
        default: 0,
    },
    
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment