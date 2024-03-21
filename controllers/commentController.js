const Post = require('../models/postModel')
const User = require('../models/userModel')
const Comment = require('../models/commentModel')

// create a comment
const createComment = async (req, res) => {
    const { user_id, text, post_id } = req.body
    if (!text) {
        console.log("Error: Provide text in comment")
        return res.status(400).json({ error: "Provide text in comment" })
    }
    try {
        const user = await User.findById(user_id)
        const post = await Post.findById(post_id)
        const comment = await Comment.create({ ...req.body, creator_user: user._id, post_id: post._id })
        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get comments 
const getComments = async (req, res) => {
    const { post_id } = req.body
    try {
        const comments = await Comment.find({post_id: post_id}).populate('creator_user').sort({ updatedAt: -1 })
        comments.map((comment) => {
            comment.creator_user = {profilePicture: comment.creator_user.profilePicture, firstName: comment.creator_user.firstName, 
                lastName: comment.creator_user.lastName, verified: comment.creator_user.verified, id: comment.creator_user._id
            }
        })
        res.status(200).json(comments)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get single comment
const getComment = async (req, res) => {

    const { id } = req.params
    
    if (!id) {
        console.log("Error: Provide comment id")
        return res.status(400).json({ error: "Provide comment id" })
    }
    try {
        const comment = await Comment.findById(id).populate('creator_user')
        res.status(200).json(comment)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// update comment
const updateComment = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide comment id")
        return res.status(400).json({ error: "Provide comment id" })
    }

    try {
        const comment = await Comment.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(comment)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// delete comment
const deleteComment = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide comment id")
        return res.status(400).json({ error: "Provide comment id" })
    }
    try {
        const comment = await Comment.findByIdAndDelete(id)
        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}



module.exports = { createComment, getComment, getComments, updateComment, deleteComment }