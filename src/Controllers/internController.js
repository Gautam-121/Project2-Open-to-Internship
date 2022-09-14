const internModel = require("../models/internModel")


const createIntern = async function(req,res){

    let {name , mobile , email , collegeName} = req.body

    if(!Object.keys(req.body).length == 0){
        return res.status(400).send({msg : "", status : false})
    }
    if(!name){
        return res.status(400).send({msg : " ", status : false})
    }
    if(!/^[a-z]{2,20}$/i.test(name)){
        return res.status({msg : " ", status : false})
    }
    if(!mobile){
        return res.status(400).send({msg : " ", status : false})
    }
    if(![].test(mobile)){
        return res.status(400).send({msg : " ", status : false})
    }
    if(!email){
        return res.status(400).send({msg : " ", status : false})
    }
    if(!(/^[a-z0-9_]{3,}@[a-z]{3,}.[a-z]{3,6}$/).test(email)){
        return res.status.send({msg : " ", status : false})
    }
    
    const mobileNumberAlreadyExist = await internModel.findOne({mobile : mobile})

    if(mobileNumberAlreadyExist){
        return res.status(400).send({msg : " ", status : false})
    }


}

