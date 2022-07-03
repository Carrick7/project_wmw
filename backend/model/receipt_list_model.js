const mongoose = require('mongoose');

// Schema for Receipt List (all_products)
const products_in_receipt_listSchema = new mongoose.Schema([{
  _id: false,
  barcode: {
    type: Number,
    min: [100000000000],
    max: [9999999999999],
    immutable: true
  },
  official_name: { 
    type: String,
    immutable: true
  },
  category: {
    type: String,
    enum: ['fruit', 'vegetable', 'dairy', 'meat', 'fish/Seafood', 'grains', 'drinks', 'sweets/biscuits', 'toiletries', 'home essentials', 'other'],
    lowercase: true,
  },
  shop: {
    type: String,
    enum: ['aldi', 'lidl', 'spar', 'tesco', 'eurospar', 'donnybrook fair', 'fresh', "joyce's", 'supervalu', 'dunnes', 'waitrose', 'iceland', 'marks & spencer', 'centra', 'londis', 'mace', 'gala', 'daybreak', 'costcutter', 'other'],
    lowercase: true,
    immutable: true
  },
  price_per_unit: { 
    type: Number,
    min: [0.01],
    max: [1000],
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, 'Quantity must be at least 1'],
    max: [1000, 'Quantity must be less than 1000'],
  }
}]);

// Schema for Receipt List
const receipt_listSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  list_name:  {
    type: String,
    maxlength: [50, 'title must be less than 50 characters'],
  },
  item_info: [products_in_receipt_listSchema]
},
{ 
  timestamps: true 
 });

module.exports = mongoose.model('Receipt_lists', receipt_listSchema);