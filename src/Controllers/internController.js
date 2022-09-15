const collegeModels = require("../models/collegeModels")
const internModel = require("../models/internModel")


const createIntern = async function (req, res) {

    try {
        
        //destructure college data
        let { name, mobile, email, collegeName } = req.body
        
        //do not accept undefiend attributes
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ msg: "No paramerter found , please provide college detail", status: false })
        }

        //validate the intern name
        if (!name) {
            return res.status(400).send({ msg: "Name is required", status: false })
        }

        // check the intern name Valid or Not ?
        if (!/^[a-zA-Z]{2,50}$/.test(name)) {
            return res.status({ msg: "Name should contain letters only and it between 2 to 100", status: false })
        }
        
        //validate the intern mobile
        if (!mobile) {
            return res.status(400).send({ msg: "Mobile is required", status: false })
        }

        // check number must be in Number Type
        if (typeof mobile !== "number") {
            return res.status(400).send({ msg: "Mobile number is required and mobile no. must be in Number data type" })
        }

        // check mobile Number Is Valid?
        if (!/^[6789]{1}[0-9]{9}$/.test(mobile)) {
            return res.status(400).send({ msg: `${mobile} is invalid, please provide valid mobile number`, status: false })
        }

        //validate the intern email
        if (!email) {
            return res.status(400).send({ msg: "email is required", status: false })
        }

        // check email is valid or not?
        if (!(/^[a-z0-9_]{3,}@[a-z]{3,}.[a-z]{3,6}$/).test(email)) {
           return res.status(400).send({ msg: "email is invalid", status: false })
        }
        
        //check if mobile no is already in db or not ?
        const mobileNumberAlreadyExist = await internModel.findOne({ mobile: mobile })

        if (mobileNumberAlreadyExist) {
            return res.status(400).send({ msg: `${mobile} is already exist`, status: false })
        }
        
        //check if mobile no is already in db or not ?
        const emailAlreadyExist = await internModel.findOne({ email: email })

        if (emailAlreadyExist) {
            return res.status(400).send({ msg: `${email} is already exist`, status: false })
        }
        
        //validate the collegeName
        if (!collegeName) {
            return res.status(400).send({ msg: "college Name is required", status: false })
        }
        
        // check collegeName is valid or not?
        if (!/^[a-zA-Z-" "]{5,100}$/.test(collegeName)) {
            return res.status(400).send({ msg: "college Name should contain letters only and it between 2 to 100", status: false })
        }
        
        //format collegeName in proper spacing
        collegeName = collegeName.split(" ").filter(a=>a).join(" ")

        // find college document present or not in db on basis of collegeName
        const idofCollege = await collegeModels.findOne({ fullName: collegeName }).select({ _id: 1 })

        if (!idofCollege) {
            return res.status(400).send({ msg: "No one register with this name", status: false })
        }
        
        // create intern data in db
        const internData = { name, mobile, email, collegeId: idofCollege._id }

        const saveData = await internModel.create(internData)

        res.status(201).send({ status: true, msg: "intern registration succesufully done", data: saveData })

    } catch (err) {
        res.status(500).send({ msg: err.message, status: false })
    }

}

const getCollegedetails = async function(req,res){

    try{
        console.log(req)

    let isValidquery = req.query

    console.log(isValidquery)
    
    if (Object.keys(isValidquery).length == 0) {
        return res.status(400).send({ msg: "No paramerter found , please provide college detail", status: false })
    }
    if(!isValidquery.collegeName){
        return res.status(400).send({msg : "CollegeName is required", status : false})
    }
    // if (!/^[a-z]{2,10}+$/i.test(isValidquery.collegeName)) {
    //     return res.status(400).send({ msg: "Name should contain letters only and it between 2 to 100", status: false })
    // }

    let collegeDetail = await collegeModels.findOne({name : isValidquery.collegeName})

    if(!collegeDetail){
        return res.status(404).send({msg : "No college register with this name"})
    }

    let internDetail = await internModel.find({collegeId : collegeDetail._id}).select({name : 1, mobile : 1, email : 1})

    console.log(internDetail)

    if(internDetail.length == 0){
        return res.status(404).send({msg : `No intern resister in ${collegeName}`, status : false} )
    }

    console.log(collegeDetail)


    console.log(collegeDetail)

    res.status(200).send({data : {"name": collegeDetail.name, "fullName": collegeDetail.fullName, "logoLink": collegeDetail.logoLink, "interns": internDetail}, status : true})

}catch(err){
    res.status(500).send({msg : err.message , status : false})
}

}

module.exports.createIntern = createIntern
module.exports.getCollegedetails = getCollegedetails