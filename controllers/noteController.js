const Note = require("./../models/NoteModel")
const factory = require("./handlerFactory")
const { includeFieldsFilter, excludeFieldsFilter } = require("./../utils/filterReqBody")


exports.createNote = factory.createOne(Note, excludeFieldsFilter, ["user"], (req, filter)=>{
    filter.user = req.user.id
})
exports.getNote = factory.getOne(Note, (req)=>{
    return { user: req.user.id, id: req.params.id }
})
exports.getNotes = factory.getAll(Note, (req)=>{
    return { user: req.user.id }
})
exports.updateNote = factory.updateOne(Note, excludeFieldsFilter, ["user"])
exports.deleteNote = factory.deleteOne(Note)








