const mongoose = require("mongoose")
const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Note must belongs to a user"],
        trim: true,
    },
    title: {
        type: String,
        required: [true, "Note must have a title."],
        trim: true,
        minLength: [3, "Note's title length must be between 3 & 25 characters."],
        maxLength: [25, "Note's title length must be between 3 & 25 characters."]
    },
    items: [{
        title: {
            type: String,
            trim: true,
            minLength: [1, "Title length of a note item  must be more than 1 ."]
        },
        url: {
            type: String,
            required: [true, "Note item must have a URL."],
            trim: true,
            lowercase: true,
            minLength: [7, "Note's title length must be more than 7 ."],
        }
    }]
})

noteSchema.methods.verifyUser = function(user){
    return this.user.equals(user._id) || user.role === "admin"
}

const Note = mongoose.model("Note", noteSchema)
module.exports = Note