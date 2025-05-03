const mongoose = require("mongoose")
const User = require("./userModel")

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Project must have a title."],
        trim: true,
        minLength: [3, "Project's name length must be between 3 & 30 characters."],
        maxLength: [30, "Project's name length must be between 3 & 30 characters."]
    },
    description: {
        type: String,
        required: [true, "Project must have a description."],
        trim: true,
        minLength: [3, "Project's name length must be between 3 & 120 characters."],
        maxLength: [20, "Project's name length must be between 3 & 120 characters."]
    },
    
    repositoryUrl: {
        type: String,
        required: [true, "Project must have a repository url."],
        trim: true,
        minLength: [7, "Project's repo url length must be between 7 & 255 characters."],
        maxLength: [255, "Project's repo url length must be between 255 & 255 characters."]
    },
    tags: [{ type: String, default: "software" }],
    imageCover: {
        type: String,
        required: [true, "Project must have an image cover"],
    },
    images: {
        type: [String],
        required: [true, "Project must have images."],
    },
    status: {
        type:String,
        trim: true,
        enum: ["completed", "pending"],
        default: "pending"
    },
    completedAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
    
})

projectSchema.pre("save", async function(next){
    const user = await User.findById( this.user )
    if(user.projects.indexOf(this.id) === -1){
        user.projects.push(this.id)
        await user.save()
    }
    next()
})

projectSchema.pre("findOneAndDelete", async function(next){
    const user = await User.findById( this.user )
    const projectIndex = user.projects.indexOf(this.id)
    if (projectIndex !== -1){
        user.projects.splice(projectIndex, 1)
        await user.save()
    }
    next()
})


const Project = mongoose.model("Project", projectSchema)
module.exports = Project