const express = require('express');
const router = express.Router();
// Controllers for all_products
const { getProducts } = require('../controllers/all_products_controllers/get_all_products_controller');
const { postNewProduct } = require('../controllers/all_products_controllers/create_product_controller');
const { updateProductPrice } = require('../controllers/all_products_controllers/update_product_price_controller');
const { getSingleProduct } = require('../controllers/all_products_controllers/get_single_product_controller');
//Authentication middleware to ensure user is signed in
const { protect } = require('../middleware/auth_middleware');

// GET all Products & POST new Product
router.route('/').get(protect, getProducts).post(protect, postNewProduct);
// GET a single Products & PUT (update) existing Product Price
router.route('/:barcode/:shop').get(protect, getSingleProduct).put(protect, updateProductPrice);

module.exports = router;