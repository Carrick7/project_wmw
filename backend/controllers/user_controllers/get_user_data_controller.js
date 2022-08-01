const asyncHandler = require ('express-async-handler');
//Models Needed for this controllers
const User = require('../../model/user_model');

// Get User Data
// @route  GET api/users/my_data
// @access Private
const get_user_data = asyncHandler(async(req, res) => {
  const {_id, user_name, email } = await User.findById(req.user._id);
  
  return res.status(200).json({
    id: _id,
    user_name: user_name,
    email: email
  });
});

module.exports = { get_user_data }