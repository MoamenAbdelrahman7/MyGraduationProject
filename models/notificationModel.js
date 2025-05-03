const mongoose = require("mongoose")
const notificationSchema = new mongoose.Schema({
    userFrom: { type: mongoose.Types.ObjectId, ref: "User" } ,
    user: { type: mongoose.Types.ObjectId, ref: "User" } ,  // to notify
    type: {
        type: String,
        required: [true, "Notification must have a type. ['like', 'comment', 'follow']"],
        trim: true,
        enum: ["like", "comment", "follow"]
    },
    content: {
        type: String,
        required: [true, "Notification must have a content."],
        trim: true,
        minLength: [3, "Notification's name length must be between 3 & 30 characters."],
        maxLength: [30, "Notification's name length must be between 3 & 30 characters."]
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

notificationSchema.methods.verifyUser = function(user){
    return this.user.equals(user._id) || user.role === "admin"
}

const Notification = mongoose.model("Notification", notificationSchema)
module.exports = Notification