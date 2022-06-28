const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const Shopping_list = require('../../model/shopping_list_model');
const User = require('../../model/user_model');

//Description: Put Shopping Lists (Update)
//Route: Put /api/shopping_lists/:id
//Access: Private
const putShoppingLists = asyncHandler(async (req, res) => {
  const product_info = req.body.product_info;
  const shopping_list = await Shopping_list.findById(req.params.id);

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

   // Validation for product_name
  for (let i = 0; i < product_info.length; i++){
    if(product_info[i].product_name.length > 50){
      return res.status(400).send(
        {message: 'The product name must be less than 50 characters'});
    }
    
    // Validation for quantity
    if(product_info[i].quantity > 100 || product_info[i].quantity < 1){
      return res.status(400).send(
        {message: 'The quantity must be between 1 and 100'});
    }
  }

  const updatedShoppingList = await Shopping_list.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedShoppingList)
});

module.exports = { putShoppingLists };