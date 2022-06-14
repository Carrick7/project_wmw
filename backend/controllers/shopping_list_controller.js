const asyncHandler = require('express-async-handler');

//Description: Get Shopping Lists
//Route: GET /api/shopping_lists
//Access: Private
const getShoppingLists = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get Shopping Lists'})
});

//Description: Post Shopping Lists
//Route: Post /api/shopping_lists
//Access: Private
const postShoppingLists = asyncHandler(async (req, res) => {
  if (!req.body.text) {
   res.status(400)
    throw new Error('Text Field is required');
  }
  res.status(200).json({ message: 'Post Shopping Lists'})
});

//Description: Put Shopping Lists (Update)
//Route: Put /api/shopping_lists/:id
//Access: Private
const putShoppingLists = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Shopping List ${req.params.id}`})
});

//Description: Delete Shopping List
//Route: Delete /api/shoppinglists
//Access: Private
const deleteShoppingLists = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Shopping List ${req.params.id}`})
});

module.exports = {
  getShoppingLists,
  putShoppingLists,
  postShoppingLists,
  deleteShoppingLists
}