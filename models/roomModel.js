const mongoose = require("mongoose")
const roomSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Room must have a title."],
        trim: true,
        minLength: [3, "Room's title length must be between 3 & 30 characters."],
        maxLength: [30, "Room's title length must be between 3 & 30 characters."]
    },
    description: {
        type: String,
        required: [true, "Room must have a description."],
        trim: true,
        minLength: [3, "Room's description length must be between 3 & 100 characters."],
        maxLength: [100, "Room's description length must be between 3 & 100 characters."]
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    image:String,
    tags: [String],
    members: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    messages: [{ type: mongoose.Types.ObjectId, ref: "ChatMessage" }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

roomSchema.methods.verifyUser = function(user){
    return this.owner.equals(user._id) 
}
const Room = mongoose.model("Room", roomSchema)
module.exports = Room