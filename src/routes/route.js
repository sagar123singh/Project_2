const express = require('express');
const router = express.Router();

const collegeController=require('../Controllers/collegeController')
const internController= require('../Controllers/internController')



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/functionUp/colleges",collegeController.createCollege)

router.post("/functionUp/interns",internController.createIntern)

router.get("/functionUp/collegeDetails",internController.getInternCollegeDetails)



module.exports= router;