const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
//Models Needed for this controller
const Receipt_lists = require('../../model/receipt_list_model');
const User = require('../../model/user_model');

//Description: Get single receipt list
//Route: GET /api/receipt_lists/:id
//Access: Private
const getReceiptList = asyncHandler(async (req, res) => {
//Validation for receipt_list ID
  //If Not Valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(
      {message: 'The Receipt List ID is invalid'});
  }
  // If Valid 
  else{
    //Find the receipt list ID in DB
    const receipt_list = await Receipt_lists.findById(req.params.id);

    //If receipt_list doesnt exist
    if(!receipt_list){
      return res.status(404).send(
       {message: 'Receipt List not found'});
    } 

    //Get the correct user
    const user = await User.findById(req.user.id);

    //If user doesnt exist
    if (!user) {
      return res.status(404).send(
       {message: 'User not found'});
  }

  //If user is not the owner of the receipt list
    if (receipt_list.user.toString() !== user.id) {
     return res.status(401).send(
     {message: 'Not Authorised'});
  }

  //Successful response
  return res.status(200).json(receipt_list);
  }
});

module.exports = { getReceiptList };