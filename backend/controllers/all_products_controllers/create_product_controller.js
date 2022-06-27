const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const All_products = require('../../model/all_products_model');

//Description: Create a product
//Route: POST /api/all_products
//Access: Public
const postNewProduct = asyncHandler(async (req, res) => {
  const { product_names, category, historical_prices, shop, barcode } = req.body;
 
  // Validate the user input 
  // Ensuring that the user has entered all the required fields
  if (!product_names || !category || !historical_prices || !shop || !barcode) {
   res.status(400)
   throw new Error('Please enter all the fields');
  }
  // Ensuring that barcode and shop combinations are unique for each product
  const existingProduct = await All_products.findOne({ barcode: barcode, shop: shop });
  if (existingProduct) {
    res.status(400)
    throw new Error(`A product registered to ${shop} with the following barcode: ${barcode} already exists`);
  }

  // Create a new product
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