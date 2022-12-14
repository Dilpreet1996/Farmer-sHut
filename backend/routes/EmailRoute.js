const express = require('express');
var nodemailer = require('nodemailer');
const route = express.Router();
route.post('/txt-mail',(req,res)=>{

  const {to,subject,body} = req.body
  var transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth:{
        user : 'dilpreetsingh.ds277@gmail.com',
        pass : 'ehwwxtzpbcsfejlf'
    }
});
var mailOptions = {
    from: 'dilpreetsingh.ds277@gmail.com',
    to:  to, 
    subject: subject, 
    text: body 
};

transporter.sendMail(mailOptions,(err,info)=>{
   if(err){
    res.status(500).send({err: err.message})
   }
   else{
     res.status(200).send({message:'Mail send',message_id:info.messageId})
   }
})

});
module.exports = route;
