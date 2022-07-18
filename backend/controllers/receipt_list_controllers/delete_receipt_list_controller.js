const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
//Models Needed for this controller
const Receipt_lists = require('../../model/receipt_list_model');
const User = require('../../model/user_model');

const deleteReceiptList = asyncHandler(async (req, res) => {

  //Validation for Receipt List
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).send({message: 'Receipt List ID is not valid'});
  }
  
  //If Valid
  //Find Receipt List
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
  
  //Successful response (List has been deleted)
  await receipt_list.remove();
   return res.status(200).json({ id: req.params.id, message: 'Receipt List Deleted' });
  
});

module.exports = { deleteReceiptList };
