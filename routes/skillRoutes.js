const express = require("express")
const router = express.Router()
const skillController = require("./../controllers/skillController")

router.route("/")
.get(skillController.getSkills)
.post(skillController.createSkill)

router.route("/:id")
.get(skillController.getSkill)
.patch(skillController.updateSkill)
.delete(skillController.deleteSkill)

module.exports = router