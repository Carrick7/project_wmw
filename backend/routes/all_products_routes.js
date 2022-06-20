const express = require('express');
const router = express.Router();
const { getProduct, postNewProduct, updateProduct } = require('../controllers/all_products_controller');

// Get all Products
router.get('/', getProduct);

// Get a single Product
router.get('/:id', getProduct);

// Create a new Product
router.post('/', postNewProduct);

// Update a Product
router.put('/:id', updateProduct);

module.exports = router;