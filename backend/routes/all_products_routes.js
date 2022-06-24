const express = require('express');
const router = express.Router();
const { getProducts, postNewProduct, updateProductPrice, getSingleProduct } = require('../controllers/all_products_controller');
//Authentication middleware to ensure user is signed in
const { protect } = require('../middleware/auth_middleware');

// GET all Products & POST new Product
router.route('/').get(protect, getProducts).post(protect, postNewProduct);
// GET a single Products & PUT (update) existing Product Price
router.route('/:barcode/:shop').get(protect, getSingleProduct).put(protect, updateProductPrice);

module.exports = router;