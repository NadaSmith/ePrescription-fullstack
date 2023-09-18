const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

require("./config/database");
require('dotenv').config;
app.use(require('./config/auth'));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

// MongoDB connection setup
mongoose.connect('mongodb://localhost/ePrescriptionDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define your routes here (authentication, CRUD operations, etc.)
app.use('/api/users', require('./routes/api/users'));

app.use('/api/users', require('./routes/api/items'));

app.use('/api/users', require('./routes/api/orders'));

//static catch-all app; always goes last bc want to test everything else first
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
