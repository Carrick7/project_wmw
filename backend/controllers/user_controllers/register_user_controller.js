const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require ('express-async-handler');
//Models Needed for this controllers
const User = require('../../model/user_model');

// Register a new user
// @route  POST api/users
// @access Public
const register_user = asyncHandler(async (req, res) => {
  const { user_name, email, password } = req.body;

  //Validation to ensure that all fields are filled out
  if (!user_name || !email || !password) {
    res.status(400)
    throw new Error('Please enter all fields');
  }

  //Check if user exists
  const user_exists = await User.findOne({ email });
  if (user_exists) {
    res.status(400)
    throw new Error('User already exists');
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);

  //Create a new user
  const user = await User.create({
    user_name, email, password: hashed_password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
      token: generate_token(user._id)
    });
  }
  else {
    res.status(400)
    throw new Error('User data is invalid');
  }
});
	
//Generate a token for a user
  const generate_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}


module.exports = { register_user };