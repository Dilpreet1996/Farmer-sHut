const express = require('express');
const route = express.Router();
route.post('/txt-mobile',(req,res)=>{
const {to,body} = req.body
const accountSid = "AC874ffebb6a05ef14ecf8c027e45c5077"
const authToken = "e1ba514b233c2bc7b13caaa60f45f84c"
const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
     body: body,
     from: '+19854418178',
     to: to
   })
  .then(message => res.status(200).send({message:message.sid}));

  
})
 module.exports = route;