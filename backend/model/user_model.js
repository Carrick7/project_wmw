const mongoose = require('mongoose');

//Regex to validate the user input
// user_name
var validateUserName = function (userName) {
  var reUserName = /^[a-zA-Z ]{2,20}$/;
  return reUserName.test(userName);
}
// email
var validateEmail = function (email) {
  var reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reEmail.test(email);
}
const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, 'name is required'],
    minlength: [2, 'name must be at least 2 letters'],
    maxlength: [20, 'name cannot be more than 20 letters'],
    validate: [validateUserName, 'Name can only contain letters'],
    match: [/^[a-zA-Z ]{2,20}$/, 'Name can only contain letters'],
    trim: true  
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    validate: [validateEmail, 'Email is invalid'],
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is invalid'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true 
    // password input will be validated from the frontend
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);