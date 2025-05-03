const Room = require("./../models/roomModel")
const User = require("./../models/userModel")
const factory = require("./handlerFactory")
const { includeFieldsFilter, excludeFieldsFilter } = require("./../utils/filterReqBody")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
const ChatMessage = require("../models/roomChatModel")

exports.createRoom = factory.createOne(Room, excludeFieldsFilter, ["owner"])
exports.getRoom = factory.getOne(Room)
exports.getRooms = factory.getAll(Room)
exports.updateRoom = factory.updateOne(Room, includeFieldsFilter, ["title", "description", "isPublic"])
exports.deleteRoom = factory.deleteOne(Room)

// Room specific

exports.joinMember = catchAsync(async (req, res, next) => {
    const { roomId } = req.body
    const memberId = req.user.id
    const room = await Room.findById(roomId)
    if (!room) { return next(new AppError("There is no room with that id.", 404)) }
    const member = await User.findById(memberId)
    if (!member) { return next(new AppError("There is no user with that id.", 404)) }

    const memberIndex = room.members.indexOf(memberId)
    if (memberIndex !== -1) { return next(new AppError(`There user is already exist in room ${roomId}`)) }
    const JoinedRoomIndex = member.joinedRooms.indexOf(roomId)
    if (JoinedRoomIndex !== -1) { return next(new AppError(`There user is already exist in room ${roomId}`)) }

    room.members.push(memberId)
    await room.save()
    member.joinedRooms.push(roomId)
    await member.save()

    res.status(200).json({
        status: "success",
        message: `User joined successfully to the room ${room.title}`
    })
})

exports.leaveMember = catchAsync(async (req, res, next) => {
    const { memberId, roomId } = req.body
    const room = await Room.findById(roomId)
    if (!room) { return next(new AppError("There is no room with that id.", 404)) }
    const member = await User.findById(memberId)
    if (!member) { return next(new AppError("There is no user with that id.", 404)) }


    const memberIndex = room.members.indexOf(memberId)
    if (memberIndex === -1) { return next(new AppError(`There is no member with that id in room ${roomId}`)) }
    const JoinedRoomIndex = member.joinedRooms.indexOf(roomId)
    if (JoinedRoomIndex === -1) { return next(new AppError(`There is no member with that id in room ${roomId}`)) }

    room.members.splice(memberIndex, 1)
    await room.save()

    member.joinedRooms.splice(JoinedRoomIndex, 1)
    await member.save()

    res.status(200).json({
        status: "success",
        message: `User leaved successfully from the room ${room.title}`
    })
})

exports.addMessage = catchAsync(async (req, res, next) => {
    const { roomId } = req.body
    const message = req.body.message

    const room = await Room.findById(roomId)
    if (!room) { return next(new AppError("There is no room with that id.", 404)) }

    const newMessage = await ChatMessage.create(message)
    room.messages.push(newMessage.id)
    await room.save()

    res.status(201).json({
        status: "success",
        message: `message sent successfully in chat of room ${room.title}`
    })
})






