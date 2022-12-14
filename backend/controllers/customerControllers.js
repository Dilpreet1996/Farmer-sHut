const mongoose = require('mongoose')
const CustomerSignUp = require('../models/CustometSignUpModel')

const createCustomer = async(req,res)=>{
    const {fname,lname,email,mobileNumber,password} = req.body
    try {
        const customerEmail = await CustomerSignUp.findOne({'email':email})
        const customerrMobile = await CustomerSignUp.findOne({'mobileNumber':mobileNumber})

        if(!customerEmail && !customerrMobile){
            await CustomerSignUp.create({fname,lname,email,mobileNumber,password})
            res.status(200).json({mssg:"Customer is Registered",status:'proced'});
            
        }
        else{
            return res.status(400).json({mssg:'Already Registered',status:'notProced'})
         }
   
        
    } catch (error) {
        res.status(500).json({Error: error.message});
    }
}

const mailAndPhoneValidator = async(req,res)=>{
    const {email,mobileNumber} = req.body;
    try {
        const customerData = await CustomerSignUp.findOne({$or: [{'email': email},{'mobileNumber': mobileNumber}]})
        if(customerData){
            res.status(200).json({mssg:"Registered",status:'proced'});
        }
        else{
            return res.status(400).json({mssg:'Not Registered',status:'notProced'})
         }

    } catch (error) {
        res.status(500).json({Error: error.message});
    }
}

const passwordUpdater=async(req,res)=>{
    const {email,mobileNumber} = await req.body

    try {
        if(email){
            await CustomerSignUp.findOneAndUpdate({email:email},{...req.body},{new:true})
        }
        if(mobileNumber){
            await CustomerSignUp.findOneAndUpdate({mobileNumber:mobileNumber},{...req.body},{new:true})
        }
       
        await res.status(200).json({mssg:"Password has been successfully updated"});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const LogInValidator=async (req,res)=>{
    const {email,password,mobileNumber} = req.body
    try {
        const Validation = await CustomerSignUp.findOne({$or: [{'email':email,'password':password},{'mobileNumber':mobileNumber,'password':password}]})
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

const updateConsumer = async (req,res)=>{
    const {id,mobileNumber,email} = req.body
    var good = true;
    try{
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({ID: 'INvalid ID'})
        }
        const Validation = await CustomerSignUp.find({$or: [{'email':email},{'mobileNumber':mobileNumber}]})
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
             await CustomerSignUp.findOneAndUpdate({_id: id},{...req.body},{new:true})
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


const getSingleConsumer=async(req,res)=>{
  const {id} = req.body;
  try {
    const Consumer = await CustomerSignUp.findById(id)
    if(Consumer){
        res.status(200).json(Consumer)
    }
  } catch (error) {
     res.status(400).json({error:error.message})
  }
}

module.exports={
    createCustomer,
    mailAndPhoneValidator,
    passwordUpdater,
    LogInValidator,
    getSingleConsumer,
    updateConsumer
}