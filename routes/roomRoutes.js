const express = require("express")
const roomController = require("./../controllers/roomController")
const router = express.Router()

router.route("/")
.get(roomController.getRooms)
.post(roomController.createRoom)

router.route("/:id")
.get(roomController.getRoom)
.patch(roomController.updateRoom)
.delete(roomController.deleteRoom)

router.route("/members")
.post(roomController.joinMember)
.delete(roomController.leaveMember)

router.route("/messages")
.post(roomController.addMessage)

module.exports = router