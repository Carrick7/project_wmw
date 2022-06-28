// User Schema
// email Regex
const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// user_name Regex
const validateUserName = /^[a-zA-Z ]{2,20}$/;
// password Regex
const validatePassword = /^[a-zA-Z0-9]{6,}(?=.*[!(){}_@#$%^£~<>?&+=]).*$/; 

module.exports = {
  validateEmail,
  validateUserName,
  validatePassword,
};