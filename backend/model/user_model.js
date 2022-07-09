const mongoose = require('mongoose');
const {validateEmail, validateUserName} = require('../middleware/regex_middleware');

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, 'name is required'],
    minlength: [2, 'name must be at least 2 letters'],
    maxlength: [20, 'name cannot be more than 20 letters'],
    validate: [validateUserName],
    match: [validateUserName],
    trim: true  
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    validate: [validateEmail],
    match: [validateEmail],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);