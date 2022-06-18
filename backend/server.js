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

//Routes Handlers
app.use('/api/shopping_lists', require('./routes/shopping_lists_routes'));
app.use('/api/users', require('./routes/user_routes'));

//error handler
app.use(errorHandler);

// Server running on port 5000
app.listen(port, () => console.log(`Server running on port ${port}`));