const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
//Models Needed for this controller
const Shopping_list = require('../../model/shopping_list_model');
const User = require('../../model/user_model');

const removeItemShoppingList = asyncHandler(async (req, res) => {
  //Validation for shopping_list ID
  //If Not Valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(
      {message: 'The Shopping List ID is invalid'});
  }
  //If Valid
  const product_info = req.body.product_info;
  const shopping_list = await Shopping_list.findById(req.params.id);
    
  //Ensure shopping_list exists
  if (!shopping_list) {
    return res.status(404).send(
      {message: 'Shopping List Not Found'});
  } 

  //Get the correct user
  const user = await User.findById(req.user.id);

  //If user doesnt exist
  if (!user) {
    return res.status(401).send(
      {message: 'User Not Found'});
  }

  //If user is not the owner of the shopping list
  if (shopping_list.user.toString() !== user.id) {
    return res.status(401).send(
      {message: 'Not Authorised'});
  }

  //Only Removeing 1 item at a time
  if(product_info.length > 1){
    return res.status(400).send({message: 'Only one item can be added at a time'});
 }
 
 //Validating product_info input
 if(product_info[0].product_name.length > 50){
   return res.status(400).send(
    {message: 'The product name must be less than 50 characters'});
}

 if(product_info[0].quantity > 100 || product_info[0].quantity < 1){
   return res.status(400).send(
    {message: 'The quantity must be between 1 and 100'});
  }

  const updatedShoppingList = await Shopping_list.findByIdAndUpdate(req.params.id, 
    {$pull: {product_info: product_info[0]}}, {new:true});

  res.status(200).json(updatedShoppingList)

});

module.exports = { removeItemShoppingList };