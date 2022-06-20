const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const All_products = require('../model/all_products_model');

//Description: Get products from the database
//Route: GET /api/all_products
//Access: Private

// Testing Route
const getProduct = asyncHandler(async (req, res) => {
  const shopping_lists = await All_products.find();

  res.status(200).json(shopping_lists)
});

//Description: Create a product
//Route: POST /api/all_products
//Access: Public
const postNewProduct = asyncHandler(async (req, res) => {
 const { product_names, category, historical_prices, shop, barcode } = req.body;

 // Validate the user input (ensuring that the user has entered all the required fields)
 if (!product_names || !category || !historical_prices || !shop || !barcode) {
  res.status(400)
  throw new Error('Please enter all the fields');
 }

 const newProduct = await All_products.create({
  product_names,
  category,
  historical_prices,
  shop,
  barcode,
 });

   res.status(200).json(newProduct)
});

// Update a Product
// Testing Route
const updateProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Add a new price to the product' });
});

// Get a single Product
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await All_products.findById(req.params.id);

  if (!product) {
  res.status(404)
  throw new Error('Shopping List not found');
}
  res.status(200).json()
});

module.exports = {
  getProduct,
  postNewProduct,
  updateProduct,
  getSingleProduct
}