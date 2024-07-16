const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/api', (req, res) => {
    res.send('Hello');
})
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);

module.exports = app;