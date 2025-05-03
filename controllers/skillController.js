const factory = require("./handlerFactory")
const Skill = require("./../models/skillModel")
const { excludeFieldsFilter } = require("./../utils/filterReqBody")
exports.createSkill = factory.createOne(Skill, excludeFieldsFilter, ["user"], (req, filter)=>{
    filter.user = req.user.id
})
exports.getSkill = factory.getOne(Skill)
exports.getSkills = factory.getAll(Skill, (req)=>{
    if(req.body.user){
        return {user: req.user.id}
    }
})
exports.updateSkill = factory.updateOne(Skill, excludeFieldsFilter, ["user"])
exports.deleteSkill = factory.deleteOne(Skill)

