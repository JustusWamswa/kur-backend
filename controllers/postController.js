const Post = require('../models/postModel')
const User = require('../models/userModel')

// create a post
const createPost = async (req, res) => {
    const { user_id, text } = req.body
    if (!text) {
        console.log("Error: Provide text in post")
        return res.status(400).json({ error: "Provide text in post" })
    }
    try {
        const user = await User.findById(user_id)
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
        const posts = await Post.find().populate('creator_user').sort({ createdAt: -1 })
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


// get posts in batch
const getBatchPosts = async (req, res) => {
    const { pageNumber, pageSize } = req.body
    try {
        const posts = await Post.find().populate('creator_user').sort({ updatedAt: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize)
        posts.map((post) => {
            post.creator_user = {admin: post.creator_user.admin, email: post.creator_user.email, profilePicture: post.creator_user.profilePicture, 
                firstName: post.creator_user.firstName, lastName: post.creator_user.lastName, verified: post.creator_user.verified
            }
        })
        res.status(200).json({posts: posts, page_number: pageNumber})

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


module.exports = { createPost, getPost, getPosts, updatePost, deletePost, getBatchPosts }