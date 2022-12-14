require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
//express app
const app = express();
app.use(express.json())

const farmerSignUpRoutes = require('./routes/FarmerSignUp')
const emailVerification = require('./routes/EmailRoute')
const customerRoutes = require('./routes/CustomerRoute')
const messageToNumber = require('./routes/NumberRoute')
const imageServer = require('./routes/ImageRoute')
const productRoutes = require('./routes/ProductRoute')
const productImageServer = require('./controllers/productImageContoller')


//middleware
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/farmerSignup',farmerSignUpRoutes)
app.use('/api/eMail',emailVerification)
app.use('/api/customerRoutes',customerRoutes)
app.use('/api/messageToNumber',messageToNumber)
app.use('/api/image',imageServer)
app.use('/api/productImage',productImageServer)

app.use('/api/products',productRoutes)




mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Database Connected and server has been listening on port ',process.env.PORT)
    })
})
.catch((err)=>{
    console.log(err)
})

