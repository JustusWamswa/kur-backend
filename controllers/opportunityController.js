const Opportunity = require('../models/opportunityModel')


// create an opportunity
const createOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.create({ ...req.body })
        res.status(200).json(opportunity)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get opportunities 
const getOpportunities = async (req, res) => {
    try {
        const opportunities = await Opportunity.find().populate('creator_user').sort({updatedAt: -1})
        res.status(200).json(opportunities)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}

// get single opportunity
const getOpportunity = async (req, res) => {
    const { id } = req.params
    if (!id) {
        console.log("Error: Provide opportunity id")
        return res.status(400).json({ error: "Provide opportunity id" })
    }
    try {
        const opportunity = await Opportunity.findById(id).populate('creator_user')
        res.status(200).json(opportunity)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}

// update opportunity
const updateOpportunity = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide opportunity id")
        return res.status(400).json({ error: "Provide opportunity id" })
    }

    try {
        const opportunity = await Opportunity.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(opportunity)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// delete opportunity
const deleteOpportunity = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide opportunity id")
        return res.status(400).json({ error: "Provide opportunity id" })
    }
    try {
        const opportunity = await Opportunity.findByIdAndDelete(id)
        res.status(200).json(opportunity)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = { createOpportunity, getOpportunity, getOpportunities, updateOpportunity, deleteOpportunity }