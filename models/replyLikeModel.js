const mongoose = require("mongoose")
const Schema = mongoose.Schema

const replyLikeSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    },
    reply_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Reply',
        index: true
    },
    
}, { timestamps: true })

const ReplyLike = mongoose.model('ReplyLike', replyLikeSchema)

module.exports = ReplyLike