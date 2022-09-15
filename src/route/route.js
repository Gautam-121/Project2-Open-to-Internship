//----------------------------------------Importing---------------------------------------------

const express = require("express")
const router = express.Router()
const collegeController = require("../Controllers/collegeController")
const internController = require("../Controllers/internController")

//----------------------------------------Creating APIs---------------------------------------------

router.post('/functionup/colleges',collegeController.createCollege)

router.post('/functionup/interns',internController.createIntern)

router.get('/functionup/collegeDetails',internController.getCollegedetails)

//------------------------------------- exporting all the router here---------------------------------

module.exports = router


