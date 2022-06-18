const mongoose = require('mongoose');

// Schema for embedded data product names
const product_namesScehma = new mongoose.Schema({
  generic_name: { 
    type: String,
    required: [true, 'A generic name is required'],
  },
  official_name: { 
    type: String,
    required: [true, 'The official brand is required'],
  } 
},  
);
// Schema for embedded data for the different prices a product can have
const product_price_infoScehma = new mongoose.Schema([{
  sale: { 
    type: String,
    enum: ['Yes', 'No'],
    required: [true, 'Select if the product  on sale'],
  },
  price_per_unit: { 
    type: Number,
    required: [true, 'The price per unit is required'],
  }, 
  purchase_date: { 
    type: Date,
    required: [true, 'The purchase date is required'],
  }, 
}],  
);

// Schema for Product info
const all_productsSchema = new mongoose.Schema({
  product_names: [product_namesScehma],
  category: {
    enum: ['Fruit', 'Vegetable', 'Dairy', 'Meat', 'Fish/Seafood', 'Grains', 'Drinks', 'Sweets', 'Toiletry', 'Home Essentials', 'Other'],
    required: [true, 'The category is required'],
  },
  historical_prices: [product_price_infoScehma],
  shop: {
    type: String,
    enum: ['Aldi', 'Lidl', 'Spar', 'Tesco', "Joyce's", 'SuperValu', 'Dunnes', 'Waitrose', 'Iceland', 'Marks & Spencer', 'Other'],
    required: [true, 'The shop is required'],
  },
  barcode: {
    type: String,
    required: [true, 'The barcode is required'],
  },

  } 
);

module.exports = mongoose.model('All_Products', all_productsSchema);