const mongoose = require("mongoose")
const chatMessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    room: {
        type: mongoose.Types.ObjectId,
        ref: "Room"
    },
    message: { 
        type: String,
        required: [true, "Message can not be empty."],
        minLength: [1, "Message's length must be more than 1 characters."],
    },
    sentAt: {
        type: Date,
        default: Date.now()
    }
})

chatMessageSchema.methods.verifyUser = function(user){
    return this.sender.equals(user._id)
}

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema)
module.exports = ChatMessage