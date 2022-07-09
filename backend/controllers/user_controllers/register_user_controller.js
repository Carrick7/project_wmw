const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require ('express-async-handler');

//Models Needed for this controllers
const User = require('../../model/user_model');
// Regex imports
const { validatePassword, validateEmail, validateUserName } = require('../../middleware/regex_middleware');

// Register a new user
// @route  POST api/users
// @access Public
const register_user = asyncHandler(async (req, res) => {
  const { user_name, email, password } = req.body;

  //Validation to ensure that all fields are filled out
  if (!user_name || !email || !password) {
    return res.status(400).send(
      {message: 'Please fill out all fields'});
  }

  //Check if user exists
  const user_exists = await User.findOne({ email });
  if (user_exists) {
    return res.status(400).send(
      {message: 'Email is already in use'});
  }

  //User Input Validation
  //Password Regex
  if (!password.match(validatePassword)) {
    return res.status(400).send(
      {message: 'Password must be at least 6 characters long with at least 1 of the following special characters: !()_@#$%^£~<>?&+='});
  }
  //Email Regex
  if (!email.match(validateEmail)) {
    return res.status(400).send(
      {message: 'Email is invalid'});
  }
  //User Name Regex
  if (!user_name.match(validateUserName)) {
    return res.status(400).send(
      {message: 'User name can only contain letters, numbers and spaces with a 20 character limit'});
  }
 
  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);

  //Create a new user
  const user = await User.create({
    user_name, email, password: hashed_password
  });

  if (user) {
   return res.status(201).json({
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
      token: generate_token(user._id)
    });
  }
  else {
    return res.status(400).send(
      {message: 'Email is already in use'});
  }
});
	
//Generate a token for a user
  const generate_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = { register_user };