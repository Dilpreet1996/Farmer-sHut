const express = require('express');
const {createCustomer,  passwordUpdater, LogInValidator, mailAndPhoneValidator, getSingleConsumer, updateConsumer} = require('../controllers/customerControllers')
const router = express.Router();

// Create Customer
router.post('/',createCustomer)

router.post('/emailAndNumber',mailAndPhoneValidator)

//put request 
router.put('/passwordReset',passwordUpdater)
router.put('/updateConsumer',updateConsumer)
//Get request
router.post('/loginValidator',LogInValidator)
router.post('/getSingleConsumer',getSingleConsumer)

module.exports = router;