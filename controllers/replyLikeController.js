const Reply = require('../models/replyModel')
const User = require('../models/userModel')
const Like = require('../models/replyLikeModel')

// create a like
const createLike = async (req, res) => {
    const { user_id, reply_id } = req.body
    if (!(user_id && reply_id)) {
        console.log("Error: Missing parameters")
        return res.status(400).json({ error: "Missing parameters" })
    }
    try {
        const user = await User.findById(user_id)
        const reply = await Reply.findById(reply_id)
        const existingLike = await Like.find({ user_id: user._id, reply_id: reply._id })
        if (existingLike.length > 0) return res.status(400).json({ error: "Already liked" })
        const like = await Like.create({ user_id: user._id, reply_id: reply._id })

        // add like
        const addLike = await Reply.findByIdAndUpdate(reply_id, { $inc: { likes: 1 } }, { new: true })
        res.status(200).json({like, addLike})

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// delete a like
const deleteLike = async (req, res) => {
    const { user_id, reply_id } = req.body
    if (!(user_id && reply_id)) {
        console.log("Error: Missing parameters")
        return res.status(400).json({ error: "Missing parameters" })
    }
    try {
        const user = await User.findById(user_id)
        const reply = await Reply.findById(reply_id)
        const existingLike = await Like.find({ user_id: user._id, reply_id: reply._id })
        if (existingLike.length == 0) return res.status(400).json({ error: "Doesn't exist" })
        const like = await Like.deleteOne({ user_id: user._id, reply_id: reply._id })

        //remove like
        const removeLike = await Reply.findByIdAndUpdate(reply_id, { $inc: { likes: -1 } }, { new: true })

        res.status(200).json({like, removeLike})

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get a like
const getLike = async (req, res) => {
    const { user_id, reply_id } = req.body
    if (!(user_id && reply_id)) {
        console.log("Error: Missing parameters")
        return res.status(400).json({ error: "Missing parameters" })
    }
    try {
        const like = await Like.find({ user_id: user_id, reply_id: reply_id })
        res.status(200).json(like)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports = { createLike, getLike, deleteLike }