const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const Shopping_list = require('../../model/shopping_list_model');
const User = require('../../model/user_model');

//Description: Get Shopping Lists
//Route: GET /api/shopping_lists
//Access: Private
const getShoppingLists = asyncHandler(async (req, res) => {
  const shopping_lists = await Shopping_list.find({user: req.user._id });

  if (!shopping_lists) {
    return res.status(401).send(
      {message: 'You have no shopping lists'});
  }
  
  res.status(200).json(shopping_lists);
});

module.exports = { getShoppingLists };