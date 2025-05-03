const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Post must belongs to a user"]
    },
    content: {
        type: String,
        required: [true, "Post must have a content."],
        trim: true,
        minLength: [1, "Post's content length must be more then 1 character."],
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

postSchema.methods.verifyUser = function(user){
    if (!user) return false;
    const userId = user._id || user;
    return this.user.equals ? this.user.equals(userId) : this.user.toString() === userId.toString();
}

postSchema.pre(/^find/, function(next){
    this.populate({
        path: "user",
        select: "name photo email" // Only populate essential fields
    });
    next();
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post