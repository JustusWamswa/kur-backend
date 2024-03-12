const Message = require('../models/messageModel')

// create a message
const createMessage = async (req, res) => {
    try {
        const user = await Message.create({ ...req.body})
        // res.status(200).json(user)
        res.status(200).json({ message: "Message has been sent successfully", status: 200 })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// read messages
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ updatedAt: -1 })
        res.status(200).json(messages)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}
const getUnResolvedMessages = async (req, res) => {
    try {
        const messages = await Message.find().filter({ resolved: false }).sort({ updatedAt: -1 })
        res.status(200).json(messages)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}
const getResolvedMessages = async (req, res) => {
    try {
        const messages = await Message.find().filter({ resolved: true }).sort({ updatedAt: -1 })
        res.status(200).json(messages)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}

// read single message
const getOneMessage = async (req, res) => {
    const { email } = req.params

    try {
        const message = await Message.findOne({email})
        res.status(200).json(message)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}

// update message status
const updateMessageStatus= async (req, res) => {
    const { _id } = req.body

    try {
        const message = await Message.findByIdAndUpdate(_id, req.body, { new: true })
        res.status(200).json(message)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// delete message
const deleteMessage = async (req, res) => {
    const { id } = req.body

    try {
        const message = await Message.findByIdAndDelete(id)
        res.status(200).json(message)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = { createMessage, getUnResolvedMessages, getResolvedMessages, updateMessageStatus, deleteMessage, getOneMessage, getMessages }