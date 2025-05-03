const express = require("express")
const userController = require("./../controllers/userController")
const authController = require("./../controllers/authController")
const router = express.Router()

// Public routes
router.route("/login").post(authController.login)
router.route("/signup").post(/*userController.uploadUserPhoto, userController.resizeUserPhoto,*/ authController.signUp)
router.route("/forgotPassword").post(authController.forgotPassword)
router.route("/resetPassword/:token").post(authController.resetPassword)

// Protected routes
// router.use(authController.protect)

router.route("/updatePassword").patch(authController.updatePassword)
router.route("/me")
    .get(userController.getMe, userController.getUser)
    .patch(userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe)
    .delete(userController.deleteMe)
router.route("/follow").post(userController.followUser)

// Admin routes
// router.use(authController.restrictTo("admin"))
router.route("/").get(userController.getUsers)
router.route("/:id").get(userController.getUser)

module.exports = router