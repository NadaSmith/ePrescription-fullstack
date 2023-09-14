const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection setup
mongoose.connect('mongodb://localhost/ePrescriptionDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define your routes here (authentication, CRUD operations, etc.)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
