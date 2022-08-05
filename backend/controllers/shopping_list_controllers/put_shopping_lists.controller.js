const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
//Models Needed for this controller
const Shopping_list = require('../../model/shopping_list_model');
const User = require('../../model/user_model');

//Description: Put Shopping Lists (Update)
//Route: Put /api/shopping_lists/:id
//Access: Private
const putShoppingLists = asyncHandler(async (req, res) => {

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

    //Validating 1 item is added to the shopping list
    if(product_info.length > 1){
      return res.status(400).send({message: 'Only one item can be added at a time'});
   }
   
   //Validating product_info input
   if(product_info[0].product_name.length > 50 || product_info[0].product_name.length <= 1){
     return res.status(400).send(
      {message: 'The product name must be between 2 & 50 characters'});
  }

   if(product_info[0].quantity.length > 15 || product_info[0].quantity.length < 1){
     return res.status(400).send(
      {message: '15 characters max for quantity'});
    }

    const updatedShoppingList = await Shopping_list.findByIdAndUpdate(req.params.id, 
      {$push: {product_info: product_info}}, {new:true});

    res.status(200).json(updatedShoppingList)

});

module.exports = { putShoppingLists };