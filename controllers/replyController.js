const Reply = require('../models/replyModel')
const User = require('../models/userModel')
const Comment = require('../models/commentModel')

// create a reply
const createReply = async (req, res) => {
    const { user_id, text, comment_id } = req.body
    if (!text) {
        console.log("Error: Provide text in reply")
        return res.status(400).json({ error: "Provide text in reply" })
    }
    try {
        const user = await User.findById(user_id)
        const comment = await Comment.findById(comment_id)
        const reply = await Reply.create({ ...req.body, creator_user: user._id, comment_id: comment._id })
        res.status(200).json(reply)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get replies 
const getReplies = async (req, res) => {
    const { comment_id } = req.body
    try {
        const replies = await Reply.find({comment_id: comment_id}).populate('creator_user').sort({ updatedAt: -1 })
        replies.map((reply) => {
            reply.creator_user = {profilePicture: reply.creator_user.profilePicture, firstName: reply.creator_user.firstName, 
                lastName: reply.creator_user.lastName, verified: reply.creator_user.verified, id: reply.creator_user._id
            }
        })
        res.status(200).json(replies)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get single reply
const getReply = async (req, res) => {

    const { id } = req.params
    
    if (!id) {
        console.log("Error: Provide reply id")
        return res.status(400).json({ error: "Provide reply id" })
    }
    try {
        const reply = await Reply.findById(id).populate('creator_user')
        res.status(200).json(reply)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// update reply
const updateReply = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide reply id")
        return res.status(400).json({ error: "Provide reply id" })
    }

    try {
        const reply = await Reply.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(reply)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// delete reply
const deleteReply = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide reply id")
        return res.status(400).json({ error: "Provide reply id" })
    }
    try {
        const reply = await Reply.findByIdAndDelete(id)
        res.status(200).json(reply)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}



module.exports = { createReply, getReplies, getReply, updateReply, deleteReply }