const express = require('express');
const router = express.Router();
const { createReceiptList } = require('../controllers/receipt_list_controllers/post_create_receipt_list_controller');
const { additemsReceiptList } = require('../controllers/receipt_list_controllers/adding_items_receipt_lists_controller');
const { removeItemsReceiptList} = require('../controllers/receipt_list_controllers/removing_items_receipt_list_controller');
const { deleteReceiptList} = require('../controllers/receipt_list_controllers/delete_receipt_list_controller');
const { getReceiptLists} = require('../controllers/receipt_list_controllers/get_all_receipt_lists_controller');
const { getReceiptList} = require('../controllers/receipt_list_controllers/get_single_receipt_list');
//Authentication middleware for shopping lists
const { protect } = require('../middleware/auth_middleware');

//Receipt Lists Routes - GET, POST, PUT, DELETE
//GET + POST shopping lists 
router.route('/').post(protect, createReceiptList).get(protect, getReceiptLists);
//PUT (add items) + DELETE shopping lists & GET single list
router.route('/:id').put(protect, additemsReceiptList).delete(protect, deleteReceiptList).get(protect, getReceiptList);
//PUT (remove items)
router.route('/:id/remove_item').put(protect, removeItemsReceiptList);

module.exports = router;