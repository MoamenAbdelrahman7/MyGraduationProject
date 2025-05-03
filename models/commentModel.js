const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Comment must belongs to a user"],
        trim: true
    },
    content: {
        type: String,
        required: [true, "Comment can not be empty"],
        minLength: [1, "Comment length must be more than 1 character"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})
commentSchema.methods.verifyUser = function(user){
    return this.author.equals(user._id) 
}





const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment