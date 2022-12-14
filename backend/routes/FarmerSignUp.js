const express = require('express');
const {createFarmer,updateFarmer, resetPassword, updatePassword, LogInValidator, getFarmerById} = require('../controllers/farmerControllers')

const router = express.Router();


//POST a new farmer with
router.post('/',createFarmer)

//Update request
router.put('/',updateFarmer)

//forgetPassword
router.post('/resetPassword',resetPassword)
router.put('/updatePassword',updatePassword)

router.post('/LogInValidator',LogInValidator)

//Get single farmer 
router.get('/getSingleFarmer/:id',getFarmerById)



module.exports = router;