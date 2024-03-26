const mongoose = require("mongoose")
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = Feedback