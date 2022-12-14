const mongoose = require('mongoose');
const Schema = mongoose.Schema
const productSchema = new Schema({
    userID:{
        type: String,
        required: true
    },
    itemType:{
      type: String,
      required: true
    },
    itemName:{
        type: String,
        required: true
    },
    itemQuantity:{
        type:String,
        required: true
    },
    itemPrice:{
        type:String,
        required: true
    }
},{timestamps: true})
module.exports = mongoose.model('ProductModel',productSchema)