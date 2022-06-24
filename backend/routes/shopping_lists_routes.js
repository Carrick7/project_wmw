const express = require('express');
const router = express.Router();
const { getShoppingLists, postShoppingLists, putShoppingLists, deleteShoppingLists, getSingleShoppingList} = require('../controllers/shopping_list_controller');
//Authentication middleware for shopping lists
const { protect } = require('../middleware/auth_middleware');

//Shopping Lists Routes - GET, POST, PUT, DELETE
//GET + POST shopping lists 
router.route('/').get(protect, getShoppingLists).post(protect, postShoppingLists);
//PUT + DELETE shopping lists & GET single list
router.route('/:id').put(protect, putShoppingLists).delete(protect, deleteShoppingLists).get(protect, getSingleShoppingList);

module.exports = router;