const factory = require("./handlerFactory")
const Post = require("../models/PostModel")
const { excludeFieldsFilter } = require("./../utils/filterReqBody")
const catchAsync = require("../utils/catchAsync")

exports.createPost = factory.createOne(Post, excludeFieldsFilter, ["user"], (req, filter) => {
    filter.user = req.user ? req.user.id : req.body.id;
})
exports.getPost = factory.getOne(Post)
exports.getPosts = factory.getAll(Post)
exports.updatePost = factory.updateOne(Post, excludeFieldsFilter, ["user"])
exports.deletePost = factory.deleteOne(Post)


