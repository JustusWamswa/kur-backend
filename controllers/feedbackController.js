const Feedback = require('../models/feedbackModel')

// create a feedback
const createFeedback = async (req, res) => {
    const { text } = req.body
    if (!text) {
        console.log("Error: Provide text in feeback")
        return res.status(400).json({ error: "Provide text in feedback" })
    }
    try {
        const feeback = await Feedback.create({ ...req.body })
        res.status(200).json(feeback)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get feedback 
const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find()
        res.status(200).json(feedback)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// update feedback
const updateFeedback = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide feedback id")
        return res.status(400).json({ error: "Provide feedback id" })
    }

    try {
        const feedback = await Feedback.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(feedback)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports = { createFeedback, getFeedback, updateFeedback }