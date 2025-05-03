const Comment = require("./../models/commentModel")
const factory = require("./handlerFactory")
const { includeFieldsFilter, excludeFieldsFilter } = require("./../utils/filterReqBody")
const Post = require("../models/PostModel")
const catchAsync = require("../utils/catchAsync")

exports.createComment = factory.createOne(Comment)
exports.getComment = factory.getOne(Comment)
exports.getComments = factory.getAll(Comment)
exports.updateComment = factory.updateOne(Comment)
exports.deleteComment = factory.deleteOne(Comment)


exports.commentOnPost = catchAsync(async(req, res, next)=>{
    const { comment, postId } = req.body

    const newComment = await Comment.create(comment)
    const post = await Post.findById(postId)
    post.comments.push(newComment.id)
    await post.save()

    res.status(201).json({
        status: "success",
        message: "comment added successfully."
    })
})

exports.getCommentsOfPost = catchAsync(async(req, res, next)=>{
    const {postId} = req.body
    const post = await Post.findById(postId)

    res.status(200).json({
        status: "success",
        post: post
    })
})