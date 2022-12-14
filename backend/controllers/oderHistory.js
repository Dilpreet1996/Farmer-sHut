const OrderHistory = require('../models/ViewOrdersForCosumer')
const ProductModel = require('../models/ProductModel')
const ConsumerModel = require('../models/CustometSignUpModel')
const createOrder=async(req,res)=>{
  const {consumerID, orderData} = req.body
  if(consumerID && orderData){

    var updateQuery='';

      updateQuery =  await OrderHistory.create({consumerID, orderData})

    res.status(200).json(updateQuery)
  }
}

const getOrdersForFarmer = async(req,res)=>{   
  const {farmerID} = req.body
  let flag = false;
  var array = new Array()
  const arrayOne = new Array()
  if(farmerID){
    const getHistory = await OrderHistory.find();
     for(let i=0;i<getHistory.length;i++){
      flag = false;
       for(let j=0;j<getHistory[i].orderData.length;j++){
          if(getHistory[i].orderData[j].farmerID  == farmerID && getHistory[i].orderData[j].status == true){
             flag = true;
            array.push(
              {
                 farmerID : getHistory[i].orderData[j].farmerID,
                  productID : getHistory[i].orderData[j].productID,
                   selectedQuantity : getHistory[i].orderData[j].selectedQuantity,
                 status : getHistory[i].orderData[j].status,
                 productInfo : await ProductModel.findById(getHistory[i].orderData[j].productID)  
              }
            )
          }
       }
       if(flag == true){
        arrayOne.push(
          {
            "_id" : getHistory[i]._id,
            "consumerID" : getHistory[i].consumerID,
            "consumerData" : await ConsumerModel.findById(getHistory[i].consumerID),
            array

          }
        )
       }
     array = []
     }
  }
  res.status(200).json(arrayOne)
}


const farmerViewOrders = async(req,res)=>{
  const {farmerID} = req.body;
  const array = new Array();
  var arrayOne = new Array();
  if(farmerID){
   const getHistory = await OrderHistory.find()
   console.log("dilpreet"+getHistory)
   for(let i=0;i<getHistory.length;i++){
    let flag = false;
      for(let j=0;j<getHistory[i].orderData.length;j++){
        if(farmerID == getHistory[i].orderData[j].farmerID)
        {
           flag = true;
           arrayOne.push(
            {
                farmerID : getHistory[i].orderData[j].farmerID,
                productID : getHistory[i].orderData[j].productID,
                selectedQuantity : getHistory[i].orderData[j].selectedQuantity,
                status : getHistory[i].orderData[j].status
            }
           )
        }
      }
    if(flag == true){
    array.push(
      {
        productID : getHistory[i].productID,
        consumerID : getHistory[i].consumerID,
        arrayOne
      }
      )
    }
    arrayOne = []
   }
   for(let i=0;i<array.length;i++){
    console.log(array[i])
   }
   res.status(200).json(array)
  }
}

const getOrdersForConsumer =async(req,res)=>{
    const {consumerID} = req.body;
    const array = new Array();

    const response = await OrderHistory.find({'consumerID' : consumerID})
     for(let i=0;i<response.length;i++)
     {
       for(let j=0;j<response[i].orderData.length;j++){
         if(response[i].orderData[j].status == true){
       
           array.push(response[i].orderData[j])
          }
  
       }
    }

    res.status(200).json(array)
}
const getOrderHistory = async(req,res)=>{
  const {consumerID} = req.body;
  const array = new Array();

  const response = await OrderHistory.find({'consumerID' : consumerID})
   for(let i=0;i<response.length;i++)
   {
     for(let j=0;j<response[i].orderData.length;j++){
       if(response[i].orderData[j].status == false){
     
         array.push(response[i].orderData[j])
        }

     }
  }

  res.status(200).json(array)
}

const updateSingleStatus =async(req,res)=>{
  const {orderID, productID,status} = req.body;
 

      const response = await OrderHistory.findOneAndUpdate({
        "_id" : orderID,
        "orderData.productID" : productID
      },{
         "orderData.$.status" : status
      },{
        new: true
      });
      res.status(200).json(response)
  
}

const updateMultiPleStatus = async(req,res)=>{
  const {orderID, productID,status} = req.body;
  const array = new Array()
  for(let i=0;i<productID.length;i++){
    const response = await OrderHistory.findOneAndUpdate({
      "_id" : orderID,
      "orderData.productID" : productID[i]
    },{
      "orderData.$.status" : status
    },{
      new: true
    })
    array.push(response)
  }
  res.status(200).json(array)
}
module.exports = {
    createOrder,
    getOrdersForFarmer,
    farmerViewOrders,
    getOrdersForConsumer,
    getOrderHistory,
    updateSingleStatus,
    updateMultiPleStatus
}