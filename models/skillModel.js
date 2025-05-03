const mongoose = require("mongoose")
const User = require("./userModel")
const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Skill must have a name."],
        trim: true,
        minLength: [2, "Skill's name length must be between 2 & 30 characters."],
        maxLength: [30, "Skill's name length must be between 2 & 30 characters."]
    },
    progress: {
        type: Number,
        min: [0, "Skill Progress must be between 0 and 100 "],
        max: [100, "Skill Progress must be between 0 and 100 "],
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    resources: {
        type: [ {
            type: String,
            trim: true,
            lowercase: true,
            minLength: [7, "Resource length must be more than 7 ."],
        }],
    },
    topics: [{
        title: {
            type: String,
            trim: true,
            lowercase: true,
            minLength: [2, "topic's title length must be more than 2 ."],
        },
        summary: String,
        isCompleted: {
            type: Boolean,
            default: false
        }
    }]

    
})

skillSchema.methods.verifyUser = function(user){
    return this.user.equals(user._id) || user.role === "admin"
}

skillSchema.pre("save", async function(next){
    const user = await User.findById( this.user )
    if(user.skills.indexOf(this.id) === -1){
        user.skills.push(this.id)
        await user.save()
    }
    next()
})

skillSchema.pre("findOneAndDelete", async function(next){
    const user = await User.findById( this.user )
    const skillIndex = user.skills.indexOf(this.id)
    if (skillIndex !== -1){
        user.skills.splice(skillIndex, 1)
        await user.save()
    }
    next()
})



const Skill = mongoose.model("Skill", skillSchema)
module.exports = Skill