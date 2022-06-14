const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/error_middleware');
const port = process.env.Port || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/shopping_lists', require('./routes/shopping_lists_routes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));