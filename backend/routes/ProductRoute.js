const express = require('express');
const {createProduct, getALLProducts, deleteSingleProduct, updateProduct,updateQuantityMany, getProductsForConsumer, getProductByID, getProductsByTypeOrName, updateQuantity,getManyProducts}  =  require('../controllers/productController')
const router = express.Router();

router.post('/',createProduct)
router.get('/:id',getALLProducts)
router.post('/getManyProducts',getManyProducts)
router.delete('/delete',deleteSingleProduct)
router.put('/update',updateProduct)
router.post('/getProductsForConsumers',getProductsForConsumer)
router.post('/getSingleProductById',getProductByID)
router.post('/getProductsByTypeOrName',getProductsByTypeOrName)
router.post('/updateQuantity',updateQuantity)
router.post('/updateQuantityMany',updateQuantityMany)
module.exports = router;