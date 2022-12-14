const mongoose = require('mongoose')
const ProductModel = require('../models/ProductModel')
const FarmerSignUp = require('../models/FarmerSignUpModel');

const createProduct = async(req,res)=>{
    const {userID,itemType,itemName,itemQuantity,itemPrice} = req.body
    const farmerID = await FarmerSignUp.findById({'_id':userID})
try{
    if(!mongoose.Types.ObjectId.isValid(userID))
    {
        return res.status(400).json({ID: 'INvalid ID'})
    }

    if(farmerID){
        const result =  await ProductModel.create({userID,itemType,itemName,itemQuantity,itemPrice})
        if(result){
            res.status(200).json({mssg:"Product is Registered",status:'proced',result:result.id});
        }else{
            res.status(200).json(result)
        }
    }
}catch(error){
    res.status(500).json({Error: error.message});
}


}

const getALLProducts = async(req,res)=>{
    const {id} = req.params;
    try{
        const products = await ProductModel.find({userID:id})
        res.status(200).json(products)
    }catch(error){
        res.status(400).json({mssg:error.message})
    }
}
const deleteSingleProduct = async(req,res)=>{
    const {id} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({ID: 'INvalid ID'})
        }
        const result = await ProductModel.deleteOne({_id:id})
         if(result){
            res.status(200).json({mssg:'Product has been deleted'})
         }
    } catch (error) {
        res.status(400).json({Error:error})
    }
}

const updateProduct = async(req,res)=>{
    const {id} = req.body
    console.log(id)
    try {
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({ID: 'INvalid ID'})
        }
        const result = await ProductModel.findOneAndUpdate({_id: id},{...req.body},{new:true})
        if(result){
            res.status(200).json({mssg: "Quantity has been updated"});
        }
    } catch (error) {
        res.status(400).json({Error:error.message})
    }
}

const getProductsForConsumer=async(req,res)=>{
    const {address} = req.body
    const products = new Array()
    const finalProducts = new Array();
   if(address){
    const farmersData = await FarmerSignUp.find({'address':address})
    for(var i=0;i<farmersData.length;i++){
        const response = await ProductModel.find({"userID": farmersData[i]._id})
        if(response.length >= 1){
            products.push(response)
        }
    }
    for(var i=0;i<products.length;i++){
        for(var j=0;j<products[i].length;j++){
            finalProducts.push(products[i][j])
        }
    }
     
   }else{
    const farmersData = await FarmerSignUp.find()
    for(var i=0;i<farmersData.length;i++){
        const response = await ProductModel.find({"userID": farmersData[i]._id})
        if(response.length >= 1){
            products.push(response)
        }
    }
    for(var i=0;i<products.length;i++){
        for(var j=0;j<products[i].length;j++){
            finalProducts.push(products[i][j])
        }
    }
   }
   res.status(200).json(finalProducts)
}

const getProductByID = async(req,res)=>{
    const {id} = req.body
    try {
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({ID: 'INvalid ID'})
        }
        const result = await ProductModel.findById(id);
        if(result){
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(400).json({Error:error.message})
    }
}

const updateQuantity = async(req,res)=>{
    const {id,itemQuantity} = req.body;
    if(id && itemQuantity){
      const result = await ProductModel.findOneAndUpdate(
        {
            _id : id
        },{
            itemQuantity : itemQuantity
        },
        {
            new : true
        }
        )
    res.status(200).json(result)
    }
}

const updateQuantityMany = async(req,res)=>{
    const {id, itemQuantity} = req.body;
    const array = new Array();
     for(let i=0;i<id.length;i++){
        const result = await ProductModel.findOneAndUpdate(
            {
                _id : id[i]
            },{
                itemQuantity : itemQuantity[i] 
            },{
                new : true
            }
        )
        array.push(result)
     }
    res.status(200).json(array)

}

const getProductsByTypeOrName = async(req,res)=>{
    const {search, address} = req.body
    const products = new Array()
    const finalProducts = new Array();
   if(address){
    const farmersData = await FarmerSignUp.find({'address':address})
    if(search){
        for(var i=0;i<farmersData.length;i++){
            // const Validation = await CustomerSignUp.findOne({$or: [{'email':email,'password':password},{'mobileNumber':mobileNumber,'password':password}]})
             const response = await ProductModel.find({$and : [{'userID' : farmersData[i]._id}, {"itemType" : search}]})
             if(response.length >= 1){
                 products.push(response)
             }
             const response1 = await ProductModel.find({$and : [{'userID' : farmersData[i]._id}, {"itemName" : search}]})
             if(response1.length >= 1){
                 products.push(response1)
             }
         }
    }
    else{
        for(var i=0;i<farmersData.length;i++){
             const response = await ProductModel.find({'userID' : farmersData[i]._id})
             if(response.length >= 1){
                 products.push(response)
             }
         }
    }
    for(var i=0;i<products.length;i++){
        for(var j=0;j<products[i].length;j++){
            finalProducts.push(products[i][j])
        }
    }
     
   }else{
    const farmersData = await FarmerSignUp.find()
    if(search){
        for(var i=0;i<farmersData.length;i++){
            const response = await ProductModel.find({$and : [{'userID' : farmersData[i]._id}, {"itemType" : search}]})
            if(response.length >= 1){
                products.push(response)
            }
            const response1 = await ProductModel.find({$and : [{'userID' : farmersData[i]._id}, {"itemName" : search}]})
            if(response1.length >= 1){
                products.push(response1)
            }
        }
    }else{
        for(var i=0;i<farmersData.length;i++){
            const response = await ProductModel.find({'userID' : farmersData[i]._id})
            if(response.length >= 1){
                products.push(response)
            }
        } 
    }
    for(var i=0;i<products.length;i++){
        for(var j=0;j<products[i].length;j++){
            finalProducts.push(products[i][j])
        }
    }
   }
   res.status(200).json(finalProducts)
   
}

const getManyProducts = async(req,res)=>{
    const {ids} = req.body
    const array = new Array();
   if(ids){
    for(let i=0;i<ids.length;i++){
     const result = await ProductModel.find({_id : ids[i]})
     array.push(result)
    }
    res.status(200).json(array)
   }

}


module.exports = {
    createProduct,
    getALLProducts,
    deleteSingleProduct,
    updateProduct,
    getProductsForConsumer,
    getProductByID,
    getProductsByTypeOrName,
    updateQuantity,
    getManyProducts,
    updateQuantityMany
}