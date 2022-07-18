const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
//Models Needed for this controller
const User = require('../../model/user_model');
const Receipt_lists = require('../../model/receipt_list_model');
const All_products = require('../../model/all_products_model');


const removeItemsReceiptList = asyncHandler(async (req, res) => {

  //Validation for Receipt List
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).send({message: 'Receipt List ID is not valid'});
  }
 
  //if Valid
  const receipt_list = await Receipt_lists.findById(req.params.id);
  
  //Ensuring The List Exists
  if(!receipt_list){
    return res.status(404).send({message: 'Receipt List does not exist'});
  }

  //Get the correct user
  const user = await User.findById(req.user.id);

  //If user doesnt exist
  if (!user) {
    return res.status(401).send(
      {message: 'User Not Found'});
  }
  
  //If user is not the owner of the shopping list
  if (receipt_list.user.toString() !== user.id) {
    return res.status(401).send(
      {message: 'Not Authorised'});
  }

  //Validating Product Details by Ensuring they exist in All_products
  const item_info = req.body.item_info[0];

  //Updating the list with the new item(s)
  const updated_list = await Receipt_lists.findByIdAndUpdate(req.params.id,
    {$pull: {item_info: item_info}}, {new:true});
   
  return res.status(200).send(updated_list);
  
});

module.exports = { removeItemsReceiptList };