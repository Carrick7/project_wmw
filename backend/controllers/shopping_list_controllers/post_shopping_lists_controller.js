const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const Shopping_list = require('../../model/shopping_list_model');

//Description: Post Shopping Lists
//Route: Post /api/shopping_lists
//Access: Private
const postShoppingLists = asyncHandler(async (req, res) => {
  const { title } = req.body;
  
  // Validation for title
  if (!title) {
     return res.status(400).send(
      {message: 'Title is Required'});
  }
  if (title.length > 17) {
     return res.status(400).send(
      {message: 'Title cannot exceed 17 characters. '});
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