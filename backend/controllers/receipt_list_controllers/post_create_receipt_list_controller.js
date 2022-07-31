const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const Receipt_lists = require('../../model/receipt_list_model');

const createReceiptList = asyncHandler(async (req, res) => {
  const { list_name } = req.body;
  
  // Validation for List Name
  if (!list_name) {
     return res.status(400).send(
      {message: 'List Name is Required'});
  }
  if (list_name.length > 17) {
     return res.status(400).send(
      {message: 'List Name cannot exceed 17 characters'});
  }
  
  const receipt_list = await Receipt_lists.create(
    {
      user: req.user._id,
      list_name: req.body.list_name
    }
);
  return res.status(201).json(receipt_list);
});

module.exports = { createReceiptList }