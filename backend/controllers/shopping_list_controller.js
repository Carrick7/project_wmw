const asyncHandler = require('express-async-handler');

const Shopping_list = require('../model/shopping_list_model');

//Description: Get Shopping Lists
//Route: GET /api/shopping_lists
//Access: Private
const getShoppingLists = asyncHandler(async (req, res) => {
  const shopping_lists = await Shopping_list.find();

  res.status(200).json(shopping_lists)
});

//Description: Post Shopping Lists
//Route: Post /api/shopping_lists
//Access: Private
const postShoppingLists = asyncHandler(async (req, res) => {
  if (!req.body.text) {
   res.status(400)
    throw new Error('Text Field is required');
  }

  const shopping_list = await Shopping_list.create(
    {text: req.body.text}
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

  await shopping_list.remove();

  res.status(200).json({ id: req.params.id })
});

module.exports = {
  getShoppingLists,
  putShoppingLists,
  postShoppingLists,
  deleteShoppingLists
}