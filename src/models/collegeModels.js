//---------------------------------------importing modules--------------------------------------------
const mongoose = require("mongoose")

//----------------------------------------Creating Schema---------------------------------------------


const collegeSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true

    },
    logolink: {
        type: String,
        required: true,
        trim: true
    },
    isDeleted: {
        type : Boolean,
        default: false

 }
},{timestamps:true});

//---------------------------------- exporting all the model here--------------------------------------

module.exports = mongoose.model("college", collegeSchema);


// { name: {mandatory, unique, example iith},
//  fullName: {mandatory},
//  logolink: {mandatory},
// isDeleted: {boolean, default: false}}