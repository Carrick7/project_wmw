const mongoose = require('mongoose');

const shopping_listSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Text is required'],
  }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Shopping_list', shopping_listSchema);