const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require ('express-async-handler');
//Models Needed for this controllers
const User = require('../../model/user_model');

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
    return res.status(400).send(
      {message: 'Invalid credentials'});
  }
  
  res.json({message: 'Login User'});	
});

  //Generate a token for a user
  const generate_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}
module.exports = { login_user };