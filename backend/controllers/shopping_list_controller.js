const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const Shopping_list = require('../model/shopping_list_model');
const User = require('../model/user_model');

//Description: Get Shopping Lists
//Route: GET /api/shopping_lists
//Access: Private
const getShoppingLists = asyncHandler(async (req, res) => {
  const shopping_lists = await Shopping_list.find({user: req.user._id });

  res.status(200).json(shopping_lists)
});

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

//Description: Put Shopping Lists (Update)
//Route: Put /api/shopping_lists/:id
//Access: Private
const putShoppingLists = asyncHandler(async (req, res) => {
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

  const updatedShoppingList = await Shopping_list.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedShoppingList)
});

//Description: Delete Shopping List
//Route: Delete /api/shoppinglists
//Access: Private
const deleteShoppingLists = asyncHandler(async (req, res) => {
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

  await shopping_list.remove();

  res.status(200).json({ id: req.params.id })
});

module.exports = {
  getShoppingLists,
  putShoppingLists,
  postShoppingLists,
  deleteShoppingLists
}