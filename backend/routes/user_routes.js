const express = require('express');
const router = express.Router();
// Controllers  
const { register_user } = require('../controllers/user_controllers/register_user_controller');
const { login_user } = require('../controllers/user_controllers/login_user_controller');
const { get_user_data } = require('../controllers/user_controllers/get_user_data_controller');
//Authentication middleware
const { protect } = require('../middleware/auth_middleware');

// Register a new user
router.post('/', register_user);
// Login a new user
router.post('/login', login_user);
// View User Data
router.get('/my_data', protect, get_user_data);

module.exports = router;