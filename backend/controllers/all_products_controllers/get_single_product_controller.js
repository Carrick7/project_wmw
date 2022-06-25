const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const All_products = require('../../model/all_products_model');

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

module.exports = { getSingleProduct }