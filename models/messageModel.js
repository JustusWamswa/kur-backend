const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
    resolved: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema)

module.exports = Message