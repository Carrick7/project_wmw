const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const All_products = require('../../model/all_products_model');

//Description: Get all products from the database
//Route: GET /api/all_products
//Access: Public
const getProducts = asyncHandler(async (req, res) => {
  const logged_products = await All_products.find();

  res.status(200).json(logged_products)
});

module.exports = { getProducts };