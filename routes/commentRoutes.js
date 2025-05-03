const express = require("express")
const commentController = require("./../controllers/commentController")
const router = express.Router()

router.route("/")
.get(commentController.getComments)
.post(commentController.createComment)

router.route("/:id")
.get(commentController.getComment)
.patch(commentController.updateComment)
.delete(commentController.deleteComment)

router.route("/postComments")
.get(commentController.getCommentsOfPost)
.post(commentController.commentOnPost)

module.exports = router