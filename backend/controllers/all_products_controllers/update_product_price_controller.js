const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const All_products = require('../../model/all_products_model');
// Validation Imports from Regex Middleware
const { validateSale } = require('../../middleware/regex_middleware');

//Description: Add a historical price to a product
//Route: PUT /api/all_products/:barcode/:shop
//Access: Public
const updateProductPrice = asyncHandler(async (req, res) => {
  const product = await All_products.findOne({barcode: req.params.barcode, shop: req.params.shop}); 
  const { historical_prices } = req.body;

  // Ensuring that the product exists
  if (!product) {
    return res.status(404).send(
      {message: `This product doesn't exist`});
   }

 // Ensuring that 1 update is done at a time
 if(historical_prices.length > 1){
    return res.status(400).send(
      {message: `Only one price & sale point can be added at a time`});
 }

  // Validate the sale input
  // Ensuring that the sale field is filled out
  if(!historical_prices[0].sale){
    return res.status(400).send(
      {message: `Please fill out the sale input field`});
  }

  // Validate the sale input (ENUM)
  const lowerCaseSales = historical_prices[0].sale.toLowerCase();
  if(validateSale.indexOf(lowerCaseSales) === -1) {
    return res.status(400).send(
     {message: `Yes or No are the only valid option for the sale field`});
  }  

  // Validate the price_per_unit input
  // Ensuring that the price_per_unit field is filled out
  if(!historical_prices[0].price_per_unit){
    return res.status(400).send(
     {message: `Please fill out the price per unit field`});    
  }

  // Validate the price_per_unit input (ENUM)
  const price = historical_prices[0].price_per_unit;
  if(price <= 0.01 || price > 1000 ){
    return res.status(400).send(
     {message: `The price per of a product must be at least €0.01 or not more than €1000`});    
  }

  // Finding the product and updating the historical_prices
  const updatedProductPrice = await All_products.findOneAndUpdate({barcode: req.params.barcode, shop: req.params.shop}, 
    // $push is used to add a new object to the array without deleting previous objects
    {$push: {historical_prices: req.body.historical_prices}}, {new: true});
  
  res.status(200).json(updatedProductPrice);
});

module.exports = { updateProductPrice }