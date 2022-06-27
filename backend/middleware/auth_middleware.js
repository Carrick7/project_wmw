const jwt = require('jsonwebtoken');
const asyncHandler = require ('express-async-handler');
const User = require('../model/user_model');

const protect = asyncHandler(async (req, res, next) => {
  //Initialising token
  let token;

  //Check if token is in the header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try{
      // Gettin token from header. Split is used to eliminate the Bearer from the token by splitting at the space and creating an array
      token = req.headers.authorization.split(' ')[1];
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Set user from the token
      req.user = await User.findById(decoded.id).select('-password');
      next();
    }
    catch(error){
      console.log(error);
      return res.status(401).send(
        {message: 'Not authorised'});
    }
  }

  if(!token){
    return res.status(401).send(
      {message: 'Not authorised, no token provided'});
  }
});

module.exports = { protect };