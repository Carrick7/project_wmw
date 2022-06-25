const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const Shopping_list = require('../../model/shopping_list_model');
const User = require('../../model/user_model');

//Description: Get Single Shopping Lists
//Route: GET /api/shopping_lists/:id
//Access: Private
const getSingleShoppingList = asyncHandler(async (req, res) => {
  const shopping_list = await Shopping_list.findById(req.params.id);

  if (!shopping_list) {
    res.status(404)
    throw new Error('Shopping List not found');
  }
  //Get the correct user
  const user = await User.findById(req.user.id);
  //If user doesnt exist
  if (!user) {
    res.status(401)
    throw new Error('User not found');
  }
  //If user is not the owner of the shopping list
  if (shopping_list.user.toString() !== user.id) {
    res.status(401)
    throw new Error('Not authorised');
  }

  res.status(200).json(shopping_list)
});

module.exports = { getSingleShoppingList };