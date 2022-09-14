const collegeModel = require("../models/collegeModels")

const createCollege = async function (req, res) {

    try {

        let isValidRequestBody = req.body

        if (Object.keys(isValidRequestBody).length == 0) {
            return res.status(400).send({ msg: "No paramerter found , please provide college detail", status: false })
        }

        let { name, fullName, logoLink } = req.body

        if (!name) {
            return res.status(400).send({ msg: "Name is required", status: false })
        }
        if (!/^[a-z]{2,10}+$/i.test(name)) {
            return res.status(400).send({ msg: "Name should contain letters only and it between 2 to 100", status: false })
        }

        const isNameAlready = await collegeModel.findOne({ name: name })

        if (isNameAlready) {
            return res.status(400).send({ msg: `${isNameAlready} is already register`, status: false })
        }

        if (!fullName) {
            return res.status(400).send({ msg: "FullName is required", status: false })
        }
        // if (!/^[a-z]{5,100}+$/i.test(fullName)) {
        //     return res.status(400).send({ msg: "Name should contain letters only and it between 2 to 100", status: false })
        // }
        // if (!/^[a-z]{5,100}$/i.test(fullName)) {
        //     res.status(400).send({ msg: "Name should contain letters only and it between 2 to 100", status: false })
        // }

        if (!logoLink) {
            return res.status(400).send({ msg: "Logi link is required", status: false })
        }

        const collegeDetail = { name, fullName, logoLink }

        const collegeCreate = await collegeModel.create(collegeDetail)

        res.status(201).send({ status: true, msg: "college registration succesufully created", data: collegeCreate })

    } catch (err) {
        return res.status(500).send({ msg: err.message, status: false })
    }
}

module.exports.createCollege = createCollege