const mongoose = require('mongoose');
// creating a new list dependancy
const Shopping_list = require('../model/shopping_list_model');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  }
  catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// Creating a new record in Shopping_list Schema
//  run();
//  async function run() {
//    const sList = await Shopping_list.create({
//      title: 'Shopping List 1',
//      product_info: [
//        {
//          product_name: 'Milk',
//          quantity: 2
//        },
//        {
//          product_name: 'Eggs',
//          quantity: 3
//        },
//      ]
//    });
//    console.log(sList);
//  }

// Creating a new record in Shopping_list Schema



module.exports = connectDB;