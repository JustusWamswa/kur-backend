const mongoose = require("mongoose")
const Schema = mongoose.Schema

const opportunitySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }
}, { timestamps: true })

const Opportunity = mongoose.model('Opportunity', opportunitySchema)

module.exports = Opportunity