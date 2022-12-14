const express = require('express');
const { createOrder,getOrdersForFarmer,farmerViewOrders,getOrdersForConsumer,getOrderHistory, updateSingleStatus,updateMultiPleStatus} = require('../controllers/oderHistory')
const router = express.Router();


router.post('/',createOrder)
router.post('/getOrders',getOrdersForFarmer)
router.post('/viewOrders',farmerViewOrders)
router.post('/getOrdersForConsumer',getOrdersForConsumer)
router.post('/getOrderHistory',getOrderHistory)
router.post('/updateSingleStatus',updateSingleStatus)
router.post('/updateMultiPleStatus',updateMultiPleStatus)
module.exports = router;