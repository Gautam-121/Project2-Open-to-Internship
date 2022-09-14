//---------------------------------------importing modules--------------------------------------------

const mongoose = require('mongoose')

//----------------------------------------Creating Schema---------------------------------------------

const Object_id = mongoose.Schema.Types.ObjectId

const internModel = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: { type: String, 
            require: true,
            unique: true 
           },
    mobile: { type: Number, 
              require: true, 
              unique: true 
            },
    collegeId: { type: Object_id, 
                 ref: "college" 
               },
    isDeleted: { type: Boolean,
                 default: false
               }
},{timestamp : true})

//---------------------------------- exporting all the model here--------------------------------------

module.exports= mongoose.model('Intern',internModel)


// { name: {mandatory},
//  email: {mandatory, valid email, unique},
//  mobile: {mandatory, valid mobile number, unique},
// collegeId: {ObjectId, ref to college model,
// isDeleted: {boolean, default: false}}