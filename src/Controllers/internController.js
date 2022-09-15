const collegeModels = require("../models/collegeModels")
const internModel = require("../models/internModel")


const createIntern = async function (req, res) {

    try {

        let { name, mobile, email, collegeName } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ msg: "No paramerter found , please provide college detail", status: false })
        }
        if (!name) {
            return res.status(400).send({ msg: "Name is required", status: false })
        }
        // if (!/^[a-z]{2,100}$/i.test(name)) {
        //     return res.status({ msg: "Name should contain letters only and it between 2 to 100", status: false })
        // }
        if (!mobile) {
            return res.status(400).send({ msg: "Mobile is required", status: false })
        }
        if (typeof mobile !== "number") {
            return res.status(400).send({ msg: "Mobile number is required and mobile no. must be in Number data type" })
        }
        // if (!/^[6789]{1}[0-9]{9}$/.test(mobile)) {
        //     return res.status(400).send({ msg: `${mobile} is invalid, please provide valid mobile number`, status: false })
        // }
        if (!email) {
            return res.status(400).send({ msg: "email is required", status: false })
        }
        if (!(/^[a-z0-9_]{3,}@[a-z]{3,}.[a-z]{3,6}$/).test(email)) {
            return res.status(400).send({ msg: "email is invalid", status: false })
        }

        const mobileNumberAlreadyExist = await internModel.findOne({ mobile: mobile })

        if (mobileNumberAlreadyExist) {
            return res.status(400).send({ msg: `${mobile} is already exist`, status: false })
        }

        const emailAlreadyExist = await internModel.findOne({ email: email })

        if (emailAlreadyExist) {
            return res.status(400).send({ msg: `${email} is already exist`, status: false })
        }

        if (!collegeName) {
            return res.status(400).send({ msg: "FullName is required", status: false })
        }
        // if (!/^[a-z]{5,100}$/i.test(collegeName)) {
        //     return res.status(400).send({ msg: "Name should contain letters only and it between 2 to 100", status: false })
        // }

        const idofCollege = await collegeModels.findOne({ fullName: collegeName }).select({ _id: 1 })

        if (!idofCollege) {
            return res.status(400).send({ msg: "No one register with this name", status: false })
        }

        const internData = { name, mobile, email, collegeId: idofCollege._id }

        const saveData = await internModel.create(internData)

        res.status(201).send({ status: true, msg: "intern registration succesufully done", data: saveData })

    } catch (err) {
        res.status(500).send({ msg: err.message, status: false })
    }

}

const getCollegedetails = async function(req,res){

    try{

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