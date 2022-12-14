const mongoose = require('mongoose')
const FarmerSignUp = require('../models/FarmerSignUpModel');


const createFarmer = async (req,res)=>{
    const {fname,lname,email,mobileNumber,password,address} = req.body

    try{

        const farmerEmail = await FarmerSignUp.findOne({'email':email})
        const farmerMobile = await FarmerSignUp.findOne({'mobileNumber':mobileNumber})
        if(!farmerEmail && !farmerMobile){
            await FarmerSignUp.create({fname,lname,email,mobileNumber,password,address})
            res.status(200).json({mssg:"Farmer is Registered",status:'proced'});
        }
        else{
            return res.status(400).json({mssg:'Already Registered',status:'notProced'})
         }
   }
    catch(err){
        res.status(500).json({Error: err.message});
    }
}

const resetPassword = async (req,res)=>{
    const {email,mobileNumber} = req.body
    try{
        const farmerEmail = await FarmerSignUp.findOne({$or: [{'email': email},{'mobileNumber': mobileNumber}]})
        console.log(farmerEmail)
        if(farmerEmail){
            res.status(200).json({mssg:'Registered',status:'proceed'})
        }
        else{
            res.status(500).json({mssg:'Not Registered',status:'notProceed'}) 
        }
    }catch(err){
        res.status(500).json({Error:err.message})
    }
}

const LogInValidator = async (req,res)=>{
    const {email,password,mobileNumber} = req.body
    try {
        const Validation = await FarmerSignUp.findOne({$or: [{'email':email,'password':password},{'mobileNumber':mobileNumber,'password':password}]})
        if(Validation){
            res.status(200).json({mssg:'Registered',status:'proceed',id:Validation._id})
        }
        else{
            res.status(500).json({mssg:'Not Registered',status:'notProceed'}) 
        }
        console.log(Validation)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}





const updateFarmer = async (req,res)=>{
    const {id,mobileNumber,email} = req.body
    var good = true;
    try{
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({ID: 'INvalid ID'})
        }
        const Validation = await FarmerSignUp.find({$or: [{'email':email},{'mobileNumber':mobileNumber}]})
        console.log(Validation)
         for(var i=0;i<Validation.length;i++){
            console.log(Validation[i]._id)
            if(Validation[i]._id == id){
     
            }else{
                good = false;
            }
         }
         console.log(good)
         if(good){
             await FarmerSignUp.findOneAndUpdate({_id: id},{...req.body},{new:true})
             res.status(200).json({mssg: "Record has been updated"}); 
         }else{
            res.status(400).json({mssg: "Data is already registered"}); 
         }
         good = true
        
    }
    catch(err){
        res.status(400).json({mssg:err.message});
    }
}

const updatePassword= async(req,res)=>{
    const {email,mobileNumber} = await req.body
   
    try {
       if(email){
        await FarmerSignUp.findOneAndUpdate({email:email},{...req.body},{new:true})
       }
       if(mobileNumber){
        await FarmerSignUp.findOneAndUpdate({mobileNumber:mobileNumber},{...req.body},{new:true})
       }
       
        await res.status(200).json({mssg:"Password has been successfully updated"});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
 
}


const getFarmerById=async (req, res) => {
    const {id} = await req.params
    console.log(id)
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ID: "Invalid ID"})
        }
        const farmer = await FarmerSignUp.findById(id)
        if(!farmer){
            return res.status(400).json({Error: "No Record found"})
        }
        res.status(200).json(farmer)
    }
    catch(err){
            res.status(400).json({err: err.message})
    }
}

module.exports={
    createFarmer,
    updateFarmer,
    resetPassword,
    updatePassword,
    LogInValidator,
    getFarmerById
    
}