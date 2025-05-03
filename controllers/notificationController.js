const Notification = require("./../models/notificationModel")
const factory = require("./handlerFactory")
const { includeFieldsFilter, excludeFieldsFilter } = require("./../utils/filterReqBody")


exports.createNotification = factory.createOne(Notification, excludeFieldsFilter, ["userFrom"], (req, filter)=>{
    filter.userFrom = req.user.id
})
exports.getNotification = factory.getOne(Notification, (req)=>{
    return { user: req.user.id, id: req.params.id }
})
exports.getNotifications = factory.getAll(Notification, (req)=>{
    return { user: req.user.id }
})
// exports.updateNotification = factory.updateOne(Notification, excludeFieldsFilter, ["user"])
// exports.deleteNotification = factory.deleteOne(Notification)








