const Post = require('../models/postModel')
const User = require('../models/userModel')
const Like = require('../models/postLikeModel')

// create a like
const createLike = async (req, res) => {
    const { email, post_id } = req.body
    if (!(email && post_id)) {
        console.log("Error: Missing parameters")
        return res.status(400).json({ error: "Missing parameters" })
    }
    try {
        const user = await User.findOne({ email })
        const post = await Post.findById(post_id)
        const existingLike = await Like.find({ user_id: user._id, post_id: post._id })
        if (existingLike.length > 0) return res.status(400).json({ error: "Already liked" })
        const like = await Like.create({ user_id: user._id, post_id: post._id })

        // add like
        const addLike = await Post.findByIdAndUpdate(post_id, { $inc: { likes: 1 } }, { new: true })

        res.status(200).json({ like, addLike })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// delete a like
const deleteLike = async (req, res) => {
    const { email, post_id } = req.body
    if (!(email && post_id)) {
        console.log("Error: Missing parameters")
        return res.status(400).json({ error: "Missing parameters" })
    }
    try {
        const user = await User.findOne({ email })
        const post = await Post.findById(post_id)
        const existingLike = await Like.find({ user_id: user._id, post_id: post._id })
        if (existingLike.length == 0) return res.status(400).json({ error: "Doesn't exist" })
        const like = await Like.deleteOne({ user_id: user._id, post_id: post._id })

        //remove like
        const removeLike = await Post.findByIdAndUpdate(post_id, { $inc: { likes: -1 } }, { new: true })

        res.status(200).json({ like, removeLike })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get a like
const getLike = async (req, res) => {
    const { email, post_id } = req.body
    if (!(email && post_id)) {
        console.log("Error: Missing parameters")
        return res.status(400).json({ error: "Missing parameters" })
    }
    try {
        const user = await User.findOne({ email })
        const like = await Like.find({ user_id: user._id, post_id: post_id })
        res.status(200).json(like)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports = { createLike, getLike, deleteLike }