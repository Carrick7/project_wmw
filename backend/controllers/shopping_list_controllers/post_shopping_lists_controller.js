const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const Shopping_list = require('../../model/shopping_list_model');
const User = require('../../model/user_model');

//Description: Post Shopping Lists
//Route: Post /api/shopping_lists
//Access: Private
const postShoppingLists = asyncHandler(async (req, res) => {
  if (!req.body.title) {
   res.status(400)
    throw new Error('title is Required');
  }

  const shopping_list = await Shopping_list.create(
    {
      title: req.body.title,
      user: req.user._id
    }
);

  res.status(200).json(shopping_list)
});

module.exports = { postShoppingLists };