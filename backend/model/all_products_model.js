const mongoose = require('mongoose');

// Schema for embedded data product names
const product_namesScehma = new mongoose.Schema({
  generic_name: { 
    type: String,
    required: [true, 'A generic name is required. IE "bananas"'],
  },
  official_name: { 
    type: String,
    required: [true, 'The official brand and name are required. IE "Chiquita Brands International"'],
  } 
});
// Schema for embedded data for the different prices a product can have
const product_price_infoScehma = new mongoose.Schema([{
  sale: { 
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'Select if the product is on sale'],
    lowercase: true
  },
  price_per_unit: { 
    type: Number,
    min: [0.01],
    max: [1000],
    required: [true, 'The price per unit is required'], 
  }
}], { timestamps: true });

// Schema for Product info
const all_productsSchema = new mongoose.Schema({
  product_names: [product_namesScehma],
  category: {
    type: String,
    enum: ['fruit', 'vegetable', 'dairy', 'meat', 'fish/Seafood', 'grains', 'drinks', 'sweets/biscuits', 'toiletries', 'home essentials', 'other'],
    required: [true, 'The category is required'],
    lowercase: true
  },
  historical_prices: [product_price_infoScehma],
  shop: {
    type: String,
    enum: ['aldi', 'lidl', 'spar', 'tesco', 'eurospar', 'donnybrook fair', 'fresh', "joyce's", 'supervalu', 'dunnes', 'waitrose', 'iceland', 'marks & spencer', 'centra', 'londis', 'mace', 'gala', 'daybreak', 'costcutter', 'other'],
    required: [true, 'The shop is required'],
    lowercase: true
  },
  barcode: {
    type: Number,
    min: [100000000000],
    max: [9999999999999],
    required: [true, 'The barcode is required'],
  }} 
);

module.exports = mongoose.model('All_products', all_productsSchema);