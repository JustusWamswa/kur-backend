const Event = require('../models/eventModel')
const User = require('../models/userModel')

// create an event
const createEvent = async (req, res) => {
    const { creator_user } = req.body
    try {
        const user = await User.findOne({email: creator_user})
        const event = await Event.create({ ...req.body, creator_user: user._id })
        res.status(200).json(event)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// get events 
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('creator_user').sort({ updatedAt: -1 })
        events.map((event) => {
            event.creator_user = {admin: event.creator_user.admin, email: event.creator_user.email, profilePicture: event.creator_user.profilePicture, 
                firstName: event.creator_user.firstName, lastName: event.creator_user.lastName, graduationYear: event.creator_user.graduationYear
            }
        })
        res.status(200).json(events)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}

// get single event
const getEvent = async (req, res) => {

    const { id } = req.params
    
    if (!id) {
        console.log("Error: Provide event id")
        return res.status(400).json({ error: "Provide event id" })
    }
    try {
        const event = await Event.findById(id).populate('creator_user')
        res.status(200).json(event)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}

// update event
const updateEvent = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide event id")
        return res.status(400).json({ error: "Provide event id" })
    }

    try {
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(event)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// delete event
const deleteEvent = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide event id")
        return res.status(400).json({ error: "Provide event id" })
    }
    try {
        const event = await Event.findByIdAndDelete(id)
        res.status(200).json(event)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// add attendee 
const addAttendee = async (req, res) => {
    const { eventId, userId } = req.body
    if (!eventId) {
        console.log("Error: Provide event id")
        return res.status(400).json({ error: "Provide event id" })
    }
    try {
        const attendees = await Event.findByIdAndUpdate(eventId, { $push: { attendees: userId } }, { new: true })
        res.status(200).json(attendees)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// remove attendee 
const removeAttendee = async (req, res) => {
    const { eventId, userId } = req.body
    if (!eventId) {
        console.log("Error: Provide event id")
        return res.status(400).json({ error: "Provide event id" })
    }
    try {
        const attendees = await Event.findByIdAndUpdate(eventId, { $pull: { attendees: userId } }, { new: true })
        res.status(200).json(attendees)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = { createEvent, getEvent, getEvents, updateEvent, deleteEvent, addAttendee, removeAttendee }