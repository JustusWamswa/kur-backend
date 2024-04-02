const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postLikeSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
        index: true
    },
    
}, { timestamps: true })

const PostLike = mongoose.model('PostLike', postLikeSchema)

module.exports = PostLike