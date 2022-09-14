const express = require("express")
const router = express.Router()
const collegeController = require("../Controllers/collegeController")
const internController = require("../Controllers/internController")


router.post('/functionup/colleges',collegeController.createCollege)

router.post('/functionup/interns',internController.createIntern)

router.get('/functionup/collegeDetails',collegeController.getCollegedetails)

module.exports = router


