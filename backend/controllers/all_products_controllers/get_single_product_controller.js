const asyncHandler = require('express-async-handler');
// Validation Imports from Regex Middleware
const { validateBarcodeLength, validateShop } = require('../../middleware/regex_middleware');
//Models Needed for this controller
const All_products = require('../../model/all_products_model');

//Description: Get a single products from the database
//Route: GET /api/all_products/:barcode/:shop
//Access: Public
const getSingleProduct = asyncHandler(async (req, res) => {

  // Validating the barcode length and format
  const validBarcode = req.params.barcode;
  if (!validBarcode.match(validateBarcodeLength)){
    return res.status(400).send(
      {message: `Barcode is not recognised. A barcode must be 12 or 13 characters long with no spaces, letters or special characters`});
  }

  // Validating the shop name
  const validShop = req.params.shop;
  const lowerValidShop = validShop.toLowerCase();
  if (validateShop.indexOf(lowerValidShop) === -1){
    return res.status(404).send(
      {message: `Shop name is not recognised. Please select a valid shop from the list`}); 
  }

  // Finding the product via barcode and shop
  const product = await All_products.findOne({barcode: req.params.barcode, shop: req.params.shop});

  //Validating if the product exists with the user's input (barcode & shop)
  if (!product) {
    return res.status(404).send(
      {message: `This product doesn't exist`});
   }
   
  res.status(200).json(product)
});

module.exports = { getSingleProduct }