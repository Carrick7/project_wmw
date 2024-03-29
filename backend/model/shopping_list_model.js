const mongoose = require('mongoose');

// Schema for embedded data (product name and quantities) in shopping_listSchema
const product_infoScehma = new mongoose.Schema([{
  product_name: { 
    type: String,
  },
  quantity: { 
    type: String,
  } 
}],  
);

// Schema for shopping lists
const shopping_listSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'title is required'],
    maxlength: [17, 'title must be less than 17 characters'],
  },
  product_info: [product_infoScehma]
}, 
  { 
   timestamps: true 
  } 
);

module.exports = mongoose.model('Shopping_list', shopping_listSchema);