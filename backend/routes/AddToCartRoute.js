const express = require('express');
const { addToCartProduct, fetchCartByCustomerID, fetchArrayOfProducts, pullToCartProduct, deleteCartByID } = require('../controllers/addToCartController');
const router = express.Router();

router.post('/',addToCartProduct)
router.post('/getCartByID',fetchCartByCustomerID)
router.post('/fetchArrayOfProducts',fetchArrayOfProducts)
router.post('/pullFromCart',pullToCartProduct)
router.delete('/deleteCart',deleteCartByID)
module.exports = router;