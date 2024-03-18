const Post = require('../models/postModel')
const User = require('../models/userModel')

// create a post
const createPost = async (req, res) => {
    const { creator_user, text } = req.body
    if (!text) {
        console.log("Error: Provide text in post")
        return res.status(400).json({ error: "Provide text in post" })
    }
    try {
        const user = await User.findOne({email: creator_user})
        const post = await Post.create({ ...req.body, creator_user: user._id })
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get posts 
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('creator_user').sort({ updatedAt: -1 })
        posts.map((post) => {
            post.creator_user = {admin: post.creator_user.admin, email: post.creator_user.email, profilePicture: post.creator_user.profilePicture, 
                firstName: post.creator_user.firstName, lastName: post.creator_user.lastName, verified: post.creator_user.verified
            }
        })
        res.status(200).json(posts)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get single post
const getPost = async (req, res) => {

    const { id } = req.params
    
    if (!id) {
        console.log("Error: Provide post id")
        return res.status(400).json({ error: "Provide post id" })
    }
    try {
        const post = await Post.findById(id).populate('creator_user')
        res.status(200).json(post)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// update post
const updatePost = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide post id")
        return res.status(400).json({ error: "Provide post id" })
    }

    try {
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(post)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// delete post
const deletePost = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide post id")
        return res.status(400).json({ error: "Provide post id" })
    }
    try {
        const post = await Post.findByIdAndDelete(id)
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// add like 
const addLike = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide post id")
        return res.status(400).json({ error: "Provide post id" })
    }
    try {
        const like = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
        res.status(200).json(like)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// remove like 
const removeLike = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide post id")
        return res.status(400).json({ error: "Provide post id" })
    }
    try {
        const like = await Event.findByIdAndUpdate(id, { $inc: { likes: -1 } }, { new: true })
        res.status(200).json(like)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = { createPost, getPost, getPosts, updatePost, deletePost, addLike, removeLike }