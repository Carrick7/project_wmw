const express = require('express');
const router = express.Router();
const { } = require('../controllers/receipt_list_controller');
//Authentication middleware for shopping lists
const { protect } = require('../middleware/auth_middleware');

//Receipt Lists Routes - GET, POST, PUT, DELETE
//GET + POST shopping lists 
router.route('/').get(protect, ).post(protect, );
//PUT + DELETE shopping lists & GET single list
router.route('/:id').put(protect, ).delete(protect, );

module.exports = router;