const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const All_products = require('../../model/all_products_model');

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

module.exports = { updateProductPrice }