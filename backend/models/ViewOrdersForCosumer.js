const mongoose = require('mongoose');
const Schema = mongoose.Schema
const orderHistory = new Schema({
    consumerID:{
        type:String,
        required:true
      },
     orderData:[{
        productID:{
          type:String,
          required:true
        },
        farmerID:{
         type:String,
         required:true
        },
        selectedQuantity:{
          type:Number,
          required:true
        },
        status: {
          type: Boolean,
          required:true
        },
        _id : false,
    }]
},{timestamps: true})
module.exports = mongoose.model('OrderHistory',orderHistory)