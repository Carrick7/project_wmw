const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const All_products = require('../model/all_products_model');

//Description: Get all products from the database
//Route: GET /api/all_products
//Access: Public
const getProducts = asyncHandler(async (req, res) => {
  const logged_products = await All_products.find();

  res.status(200).json(logged_products)
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

//Description: Add a historical price to a product
//Route: PUT /api/all_products/:barcode/:shop
//Access: Public
const updateProductPrice = asyncHandler(async (req, res) => {
  const product = await All_products.findOne({barcode: req.params.barcode, shop: req.params.shop}); 

  if (!product) {
    res.status(404)
    throw new Error('Product not found');
  }

  const updatedProductPrice = await All_products.findOneAndUpdate({barcode: req.params.barcode, shop: req.params.shop}, 
    // $push is used to add a new object to the array
    {$push: {historical_prices: req.body.historical_prices}}, {new: true});

  res.status(200).json(updatedProductPrice);
});

//Description: Get a single products from the database
//Route: GET /api/all_products/:barcode/:shop
//Access: Public
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await All_products.findOne({barcode: req.params.barcode, shop: req.params.shop});

  //Validating if the product exists with the user's input (barcode & shop)
  if (!product) {
    res.status(404)
    throw new Error('Product not found');
  }
  res.status(200).json(product)
});

module.exports = {
  getProducts,
  postNewProduct,
  updateProductPrice,
  getSingleProduct
}