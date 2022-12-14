const express = require('express');
const {createProduct, getALLProducts, deleteSingleProduct, updateProduct, getProductsForConsumer}  =  require('../controllers/productController')
const router = express.Router();


router.post('/',createProduct)
router.get('/:id',getALLProducts)
router.delete('/delete',deleteSingleProduct)
router.put('/update',updateProduct)
router.post('/getProductsForConsumers',getProductsForConsumer)
module.exports = router;