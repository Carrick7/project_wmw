const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require ('express-async-handler');
const User = require('../model/user_model');


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

// Authenticate a user (login)
// @route  POST api/users/login
// @access Public
const login_user = asyncHandler( async(req, res) => {

  const { email, password } = req.body;

  //Checking the user's email and password
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
      token: generate_token(user._id)
    });
  }
  else {
    res.status(400)
    throw new Error('Invalid credentials');
  }
  
  res.json({message: 'Login User'});	
});
// Get User Data
// @route  GET api/users/my_data
// @access Private
const get_user_data = asyncHandler(async(req, res) => {
  const {_id, user_name, email } = await User.findById(req.user._id);
  
  res.status(200).json({
    id: _id,
    user_name: user_name,
    email: email
  });
});

//Generate a token for a user
const generate_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = {
  register_user,
  login_user, 
  get_user_data
}