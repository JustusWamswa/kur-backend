const mongoose = require("mongoose")
const Schema = mongoose.Schema

const replySchema = new Schema({
    creator_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Comment',
        index: true
    },
    likes: {
        type: Number,
        default: 0,
    },
    
}, { timestamps: true })

const Reply = mongoose.model('Reply', replySchema)

module.exports = Reply