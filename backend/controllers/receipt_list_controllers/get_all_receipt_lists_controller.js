const asyncHandler = require('express-async-handler');
//Models Needed for this controller
const Receipt_lists = require('../../model/receipt_list_model');

//Description: Get Shopping Lists
//Route: GET /api/receipt_lists
//Access: Private
const getReceiptLists = asyncHandler(async (req, res) => {
  const receipt_lists = await Receipt_lists.find({user: req.user._id });

  if (!receipt_lists) {
    return res.status(401).send(
      {message: 'You have no receipt lists'});
  }
  
  res.status(200).json(receipt_lists);
});

module.exports = { getReceiptLists };