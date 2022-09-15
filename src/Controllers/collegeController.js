//-------------------------------------------------importing module---------------------------------------------------

const collegeModel = require("../models/collegeModels")

//----------------------------------------creating college(POST /functionup/colleges)------------------------------------------------------

const createCollege = async function (req, res) {

    try {

        let isValidRequestBody = req.body
        
        //do not accept undefiend attributes
        if (Object.keys(isValidRequestBody).length == 0) {
            return res.status(400).send({ status: false, msg: "No parameter found , please provide college details" })
        }

         // destructure college data
        let { name, fullName, logoLink, isDeleted} = req.body

  //-------------------------------------validate the college name---------------------------------------------------

        if (!name) {
            return res.status(400).send({ msg: "Name is required", status: false })
        }

        //trimming extra spaces
        if(name.trim().length==0)
        return res.status(400).send({status : false, msg : "name must not be empty"})

         //Check if Name Is Vilid or Not?
        if (!/^[a-zA-Z-" "]{2,10}$/.test(name)) {
            return res.status(400).send({ status: false, msg: "Name should contain letters only and in between 2 to 10" })
        }
        
        //format name in proper spacing
        name = name.split(" ").filter(a=>a).join("")

        //check college name is already present In DB or Not!
        const isNameAlready = await collegeModel.findOne({ name: name })

        if (isNameAlready) {
            return res.status(400).send({ msg: `${isNameAlready.name} is already registered`, status: false })
        }

        
        
//-----------------------------------------------validate the Full name---------------------------------------------------

        if (!fullName) {
            return res.status(400).send({ msg: "FullName is required", status: false })
        }

        //trimming extra spaces
        if(fullName.trim().length==0)
        return res.status(400).send({status : false, msg : "fullName must not be empty"})
        
        //Check if Full name Is Vilid or Not?
        if (!/^[a-zA-Z-" "]{5,100}$/.test(fullName)) {
            return res.status(400).send({ msg: " Full Name should contain letters only and it between 5 to 100", status: false })
        }
        
        //format name in proper spacing
        fullName = fullName.split(" ").filter(a=>a).join(" ")
        
//---------------------------------------------validate the LogoLink/-----------------------------------------------
        if (!logoLink) {
            return res.status(400).send({status: false, msg: "Logo link is required" })
        }

        //trimming extra spaces
        if(logoLink.trim().length==0)
        return res.status(400).send({status : false, msg : "logoLink must not be empty"})

        //Check the LogoLink Is Valid or Not?
        if (!(/^[a-zA-Z0-9!@#$&()`.:?=_+,/"-]*$/.test(logoLink))){
            return res.status(400).send({ status: false, msg: 'Not a valid logoLink' })
      }

//-------------------------------------check if isDeleted is TRUE/FALSE/------------------------------------- ?
        if (isDeleted) {
            if(typeof isDeleted !== "boolean"){
                return res.status(400).send({msg : "isDeleted must be in boolean type", status : false})
            }
            if(isDeleted){
                return res.status(400).send({msg : "you can not set isdeleted True" , status : false})
            }
        }
//-------------------------------------/-----------------------------------/------------------------------------- 

        const collegeDetail = { name, fullName, logoLink }

        console.log(collegeDetail)
        
 //-----------------------------------------create Data In DB/-----------------------------------------------------------
        const collegeCreate = await collegeModel.create(collegeDetail)

        res.status(201).send({ status: true, msg: "college registration succesufully done", data: collegeCreate })

    } catch (err) {
        return res.status(500).send({ msg: err.message, status: false })
    }
}
    
//--------------------------------------------exporting module---------------------------------------------------

module.exports.createCollege = createCollege