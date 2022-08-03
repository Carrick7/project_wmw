const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/error_middleware');

const connectDB = require('./config/db');
const port = process.env.Port || 5000;

//Connecting Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Handlers
// Shopping List Route
app.use('/api/shopping_lists', require('./routes/shopping_lists_routes'));
// User Route
app.use('/api/users', require('./routes/user_routes'));
// Product Route
app.use('/api/all_products', require('./routes/all_products_routes'));
// Receipt List Route
app.use('/api/receipt_lists', require('./routes/receipt_lists_routes'));

//serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  );
}

//error handlers
app.use(errorHandler);

// Server running on port 5000
 app.listen(port, () => console.log(`Server running on port ${port}`));
 