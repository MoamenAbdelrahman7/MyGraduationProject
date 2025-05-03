const Project = require("./../models/projectModel")
const factory = require("./handlerFactory")
const { includeFieldsFilter, excludeFieldsFilter } = require("./../utils/filterReqBody")

exports.createProject = factory.createOne(Project)
exports.getProject = factory.getOne(Project)
exports.getProjects = factory.getAll(Project)
exports.updateProject = factory.updateOne(Project)
exports.deleteProject = factory.deleteOne(Project)
