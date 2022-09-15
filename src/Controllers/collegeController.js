const collegeModel = require("../models/collegeModels")

const createCollege = async function (req, res) {

    try {

        let isValidRequestBody = req.body
        
        //do not accept undefiend attributes
        if (Object.keys(isValidRequestBody).length == 0) {
            return res.status(400).send({ msg: "No paramerter found , please provide college detail", status: false })
        }

         // destructure college data
        let { name, fullName, logoLink, isDeleted} = req.body
        
        //validate the college name
        if (!name) {
            return res.status(400).send({ msg: "Name is required", status: false })
        }
        
         //Check if Name Is Vilid or Not?
        if (!/^[a-zA-Z-" "]{2,10}$/.test(name)) {
            return res.status(400).send({ msg: "Name should contain letters only and it between 2 to 10", status: false })
        }
        
        //format name in proper spacing
        name = name.split(" ").filter(a=>a).join("")

        //check college name is already present In DB or Not!
        const isNameAlready = await collegeModel.findOne({ name: name })

        if (isNameAlready) {
            return res.status(400).send({ msg: `${isNameAlready.name} is already register`, status: false })
        }
        
        //validate the Full name
        if (!fullName) {
            return res.status(400).send({ msg: "FullName is required", status: false })
        }
        
        //Check if Full name Is Vilid or Not?
        if (!/^[a-zA-Z-" "]{5,100}$/.test(fullName)) {
            return res.status(400).send({ msg: " Full Name should contain letters only and it between 5 to 100", status: false })
        }
        
        //format name in proper spacing
        fullName = fullName.split(" ").filter(a=>a).join(" ")

        //validate the LogiLink
        if (!logoLink) {
            return res.status(400).send({ msg: "Logo link is required", status: false })
        }

        // Check the LogoLink Is Valid or Not?
    //     if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/.test(data.logoLink))) {
    //         return res.status(400).send({ status: false, msg: 'Not a valid logoLink' })
    //   }

        //check if isDeleted is TRUE/FALSE ?
        if (isDeleted) {
            if(typeof isDeleted !== "boolean"){
                return res.status(400).send({msg : "isDeleted is in boolean type", status : false})
            }
            if(isDeleted){
                return res.status(400).send({msg : "you can not set isdeleted True" , status : false})
            }
        }
       
        const collegeDetail = { name, fullName, logoLink }

        console.log(collegeDetail)
        
        //create Data In DB
        const collegeCreate = await collegeModel.create(collegeDetail)

        res.status(201).send({ status: true, msg: "college registration succesufully created", data: collegeCreate })

    } catch (err) {
        return res.status(500).send({ msg: err.message, status: false })
    }
}

module.exports.createCollege = createCollege