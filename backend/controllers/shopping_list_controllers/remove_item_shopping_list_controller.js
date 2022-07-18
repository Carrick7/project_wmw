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

  //Assigning the product_info body of chosen item to const
  const product_info = req.body.product_info[0];

  //Finfing product info by ID
 const deletedItem = await Shopping_list.findByIdAndUpdate(req.params.id,
  {$pull: {product_info: product_info}}, {new: true});

  return res.status(200).send(deletedItem);
  
});

module.exports = { removeItemShoppingList };