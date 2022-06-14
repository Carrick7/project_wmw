const express = require('express');
const router = express.Router();
const { getShoppingLists, postShoppingLists, putShoppingLists, deleteShoppingLists} = require('../controllers/shopping_list_controller');

//Get + Post shopping lists 
router.route('/').get(getShoppingLists).post(postShoppingLists);
//Update + Delete shopping lists 
router.route('/:id').put(putShoppingLists).delete(deleteShoppingLists);

module.exports = router;