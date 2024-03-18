const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    creator_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

module.exports = Post