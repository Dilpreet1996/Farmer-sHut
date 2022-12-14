const mongoose = require('mongoose');
const Schema = mongoose.Schema

const farmerSignUpSchema = new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type: String, 
        required:false
    },
    email:{
        type: String,
        required:true
    },
    mobileNumber:{
        type: Number,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required: false
    }
},{timestamps: true})

module.exports = mongoose.model('FarmerSignUp',farmerSignUpSchema);