const mongoose = require('mongoose');
const AddToCartModel = require('../models/AddToCartModel');
const ProductModel = require('../models/ProductModel')

const addToCartProduct=async(req,res)=>{
    const {consumerID,productData} = await req.body;
    console.log(consumerID)
    if(!mongoose.Types.ObjectId.isValid(consumerID)){
    return res.status(404).json("Invalid Consumer ID")
    }
    const fetchConsumer = await AddToCartModel.findOne({"consumerID" : consumerID})
    if(fetchConsumer){
   var isProductIdMatch = false;
    for(let i=0;i<productData.length;i++){
       for(let j=0;j<fetchConsumer.productData.length;j++){
          console.log(`input:- ${productData[i].productID} previos:- ${fetchConsumer.productData[j].productID}`)
          if(productData[i].productID == fetchConsumer.productData[j].productID){
            isProductIdMatch = true;
            const updateQuery = await AddToCartModel.findOneAndUpdate(
              {
                $and:[
                  {"productData.productID" : fetchConsumer.productData[j].productID},
                  {"consumerID" : consumerID}
                ]
              },
              {
                "$set" : {
                   "productData.$.productQuantity" : productData[i].productQuantity
                }
              },{new : true}
            )
            res.status(200).json(updateQuery)
          }
       } 
    }

    if(!isProductIdMatch){
      for(let i=0;i<productData.length;i++){
        console.log(fetchConsumer.consumerID)
          const updateQuery = await AddToCartModel.findOneAndUpdate(
            {
              "consumerID" : fetchConsumer.consumerID
            },
            {
             "$push":{
               "productData" : {"productID" : productData[i].productID, "productQuantity" : productData[i].productQuantity}
             }
            },
            {
              new : true
            }
          )
         res.status(200).json(updateQuery)
      }
    }
  }
  else
  {
    const result = await AddToCartModel.create({consumerID,productData})
    res.status(200).json(result)
  }

   
}

const fetchCartByCustomerID = async(req,res)=>{
   const {consumerID} = req.body;
   console.log(consumerID)

   const fetchConsumer = await AddToCartModel.findOne({"consumerID" : consumerID})
   if(fetchConsumer){
     res.status(200).json(fetchConsumer)
   }else{
    res.status(400).json("No data found")
   }
 
}

const fetchArrayOfProducts = async(req,res)=>{
    const {ids} = req.body;
    let productArray = new Array();
 console.log(ids)
  if(ids){
    for(let i=0;i<ids.length;i++){
      let fetchProducts = await ProductModel.findById({_id : ids[i].productID})
         productArray.push(fetchProducts);
     }
 }
 
  res.status(200).json(productArray);

} 

const pullToCartProduct = async(req,res)=>{
  const {cartID, productID} = req.body;
  console.log("cart id is "+cartID+"    "+"productID "+productID);
    if(cartID && productID){
      const updateQuery = await AddToCartModel.findOneAndUpdate(
        {
          "_id" : cartID
        },
        {
         "$pull":{
           "productData" : {"productID" : productID}
         }
        },
        {
          new : true
        }
      )
     res.status(200).json({mssg: "Product has been deleted from the cart",res:updateQuery})
    }

}

const deleteCartByID = async(req,res)=>{
  const { id } = req.body
  if(id){
    const result = await AddToCartModel.deleteOne({_id : id})
    if(result){
      res.status(200).json({mssg: 'Cart has been deleted'})
    }
   
  }
}
module.exports={
    addToCartProduct,
    fetchCartByCustomerID,
    fetchArrayOfProducts,
    pullToCartProduct,
    deleteCartByID
}