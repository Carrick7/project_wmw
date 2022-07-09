// User Schema
// email Regex
const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// user_name Regex
const validateUserName = /^[a-zA-Z ]{2,20}$/;
// password Regex
const validatePassword = /^[a-zA-Z0-9]{6,}(?=.*[!()_@#$%^£~<>?&+=]).*$/; 

// All_Products Schema
// shop validation
const validateShop = ['aldi', 'lidl', 'spar', 'tesco', 'eurospar', 'donnybrook fair', 'fresh', "joyce's", 'supervalu', 'dunnes', 'waitrose', 'iceland', 'marks & spencer', 'centra', 'londis', 'mace', 'gala', 'daybreak', 'costcutter', 'other']
// category validation
const validateCategory = ['fruit', 'vegetable', 'dairy', 'meat', 'fish/Seafood', 'grains', 'drinks', 'sweets/biscuits', 'toiletries', 'home essentials', 'other']
// sale validation
const validateSale = ['yes', 'no']
//barcode validation
const validateBarcodeLength = /^[0-9]{12,13}$/

module.exports = {
  validateEmail,
  validateUserName,
  validatePassword,
  validateShop,
  validateCategory,
  validateSale,
  validateBarcodeLength,
};