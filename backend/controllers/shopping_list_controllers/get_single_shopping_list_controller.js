const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
//Models Needed for this controller
const Shopping_list = require('../../model/shopping_list_model');
const User = require('../../model/user_model');

//Description: Get Single Shopping Lists
//Route: GET /api/shopping_lists/:id
//Access: Private
const getSingleShoppingList = asyncHandler(async (req, res) => {
  //Validation for shopping_list ID
  //If Not Valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(
      {message: 'The Shopping List ID is invalid'});
  }
  // If Valid 
  else{
    //Find the shopping list ID in DB
    const shopping_list = await Shopping_list.findById(req.params.id);

    //If shopping_list doesnt exist
    if(!shopping_list){
      return res.status(404).send(
       {message: 'Shopping List not found'});
    } 

    //Get the correct user
    const user = await User.findById(req.user.id);

    //If user doesnt exist
    if (!user) {
      return res.status(404).send(
       {message: 'User not found'});
  }

  //If user is not the owner of the shopping list
    if (shopping_list.user.toString() !== user.id) {
     return res.status(401).send(
     {message: 'Not Authorised'});
  }

  //Successful response
  return res.status(200).json(shopping_list);
  }
});

module.exports = { getSingleShoppingList };