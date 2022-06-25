const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const All_products = require('../../model/all_products_model');

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

module.exports = { postNewProduct }