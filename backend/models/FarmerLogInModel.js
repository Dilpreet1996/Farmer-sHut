const mongoose = require('mongoose');
const Schema = mongoose.Schema
const farmerLogInSchema = new Schema({
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:false
    }
})
module.exports = mongoose.model('FarmerLogIn',farmerLogInSchema);