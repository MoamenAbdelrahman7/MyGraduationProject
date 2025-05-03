const express = require("express")
const chatbotController = require("./../controllers/chatbotController")
const router = express.Router()

router.post("/ask", chatbotController.askGemini );

module.exports = router