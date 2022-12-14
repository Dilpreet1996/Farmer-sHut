const mongoose = require('mongoose');
const Schema = mongoose.Schema

const addToCartSchema = new Schema({
  consumerID:{
      type:String,
      required:true
    },
  productData:[{
      productID:{
        type:String,
        required:true
      },
      productQuantity:{
        type:Number,
        required:true
      },
      _id : false,
  }]

},{timestamps: true})
module.exports = mongoose.model('AddToCart',addToCartSchema);