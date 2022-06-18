const express = require('express');
const router = express.Router();
const { register_user, login_user, get_user_data } = require('../controllers/user_controller');
const { protect } = require('../middleware/auth_middleware');

// Register a new user
router.post('/', register_user);
// Login a new user
router.post('/login', login_user);
// View User Data
router.get('/my_data', protect, get_user_data);

module.exports = router;