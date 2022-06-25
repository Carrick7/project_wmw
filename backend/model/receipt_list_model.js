const mongoose = require('mongoose');

// Schema for Receipt List (all_products)
const products_in_receipt_listSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    ref: 'official_name',
    required: true
  }
  
});

// Schema for Receipt List
const receipt_listSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: mongoose.Schema.Types.String,
    ref: 'official_name',
    required: true
  }
});