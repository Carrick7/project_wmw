const express = require('express');
const router = express.Router();
// Controllers
const { getShoppingLists } = require('../controllers/shopping_list_controllers/get_shopping_lists_controller');
const { postShoppingLists } = require('../controllers/shopping_list_controllers/post_shopping_lists_controller');
const { putShoppingLists } = require('../controllers/shopping_list_controllers/put_shopping_lists.controller');
const { deleteShoppingLists } = require('../controllers/shopping_list_controllers/delete_shopping_lists_controller');
const { getSingleShoppingList } = require('../controllers/shopping_list_controllers/get_single_shopping_list_controller');
const { removeItemShoppingList } = require('../controllers/shopping_list_controllers/remove_item_shopping_list_controller');
//Authentication middleware for shopping lists
const { protect } = require('../middleware/auth_middleware');

//Shopping Lists Routes - GET, POST, PUT, DELETE
//GET + POST shopping lists 
router.route('/').get(protect, getShoppingLists).post(protect, postShoppingLists);
//PUT + DELETE shopping lists & GET single list
router.route('/:id').put(protect, putShoppingLists).delete(protect, deleteShoppingLists).get(protect, getSingleShoppingList);
//PUT remove item
router.route('/:id/remove').put(protect, removeItemShoppingList);

module.exports = router;