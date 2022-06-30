const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const All_products = require('../../model/all_products_model');
// Validation Imports from Regex Middleware
const { validateShop, validateCategory, validateSale, validateBarcodeLength } = require('../../middleware/regex_middleware');

//Description: Create a product
//Route: POST /api/all_products
//Access: Public
const postNewProduct = asyncHandler(async (req, res) => {
  const { product_names, category, historical_prices, shop, barcode } = req.body;
 
  // Validate the user input 
  // Ensuring that the user has entered all the required fields
  if (!product_names || !category || !historical_prices || !shop || !barcode) {
   return res.status(400).send(
    {message: 'Please enter all the required fields'});
  }
  
  // Validating the barcode length (13 or 12 digits)
    if(!barcode.match(validateBarcodeLength)) {
    return  res.status(400).send(
      {message: `Barcode can only be 12 or 13 digits with no letters, spaces or special characters`}); 
    }

  // Ensuring that barcode and shop combinations are unique for each product
  const existingProduct = await All_products.findOne({ barcode: barcode, shop: shop });
  if (existingProduct) {
    return res.status(400).send(
      {message: `A product registered to ${shop} with the following barcode: ${barcode} already exists`});
  }

  // Validate the shop input
  const lowerCaseShop = shop.toLowerCase();
  //The indexOf() method returns the first index of a value in an array. If there is no match, the method returns -1
  if(validateShop.indexOf(lowerCaseShop) === -1) {
    return res.status(400).send(
     {message: `${shop} is not a registered with us. Please enter 'other' if the shop is not registered with us`});
  }

  // Validate the category input
  const lowerCaseCategory = category.toLowerCase();
  if(validateCategory.indexOf(lowerCaseCategory) === -1) {
    return res.status(400).send(
      {message: `${category} is not a registered with us. Please enter 'other' if you cannot find the correct category`});
  }

  // Validate the historical_prices - sale & and price_per_unit inputs
  for (let i =0; i < historical_prices.length; i++){
      
      // Only allowing 1 historical_price object to be created when a product is logged in
      if(historical_prices.length > 1){
        return res.status(400).send(
          {message: `Please create the product first before adding multiple price points`});
      }

      // Validate the sale input
      // Ensuring that the sale field is filled out
      if(!historical_prices[i].sale){
        return res.status(400).send(
          {message: `Please fill out the sale field`});
      }
      // Ensuring that sale input matches 
      const lowerCaseSales = historical_prices[i].sale.toLowerCase();
      if(validateSale.indexOf(lowerCaseSales) === -1) {
        return res.status(400).send(
         {message: `Yes or No are the only valid option for the sale field`});
      }

      // Ensuring that the price per unit field is filled out
      if(!historical_prices[i].price_per_unit){
        return res.status(400).send(
          {message: `Please fill out the price per unit field`});
      }      

      // Validate the price_per_unit input
      const prices = historical_prices[i].price_per_unit;
      if(prices <= 0.01 || prices > 1000) {
        return res.status(400).send(
         {message: `The price per of a product must be at least €0.01 or not more than €1000`});
      }
  }

  // Create a new product
  const newProduct = await All_products.create({
   product_names,
   category,
   historical_prices,
   shop,
   barcode,
  });

  //Successfully created a new product
  res.status(201).json(newProduct);
 });

module.exports = { postNewProduct }